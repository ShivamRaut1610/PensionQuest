import redis.asyncio as redis
from app.config import settings

redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)

LEADERBOARD_KEYS = {
    "national": "lb:national:xp",
    "city": "lb:city:{city}:xp",
    "friends": "lb:friends:{user_id}:xp",
    "streak": "lb:streak:all",
    "contribution": "lb:contribution:all"
}


async def update_user_xp(user_id: str, total_xp: int, city: str = None):
    """Update user's XP in national and city leaderboards."""
    await redis_client.zadd("lb:national:xp", {user_id: total_xp})
    if city:
        await redis_client.zadd(f"lb:city:{city}:xp", {user_id: total_xp})


async def get_leaderboard(board_type: str, city: str = None, limit: int = 50) -> list:
    """Get top users from a leaderboard."""
    key = f"lb:{board_type}:xp"
    if board_type == "city" and city:
        key = f"lb:city:{city}:xp"

    # Get top N users with scores (descending)
    results = await redis_client.zrevrange(key, 0, limit - 1, withscores=True)

    leaderboard = []
    for rank, (user_id, score) in enumerate(results, start=1):
        user_data = await redis_client.hgetall(f"user:{user_id}:profile")
        leaderboard.append({
            "rank": rank,
            "user_id": user_id,
            "name": user_data.get("name", "Anonymous"),
            "level": int(user_data.get("level", 1)),
            "xp": int(score)
        })

    return leaderboard


async def get_user_rank(user_id: str, board_type: str = "national") -> dict:
    """Get user's rank in a leaderboard."""
    key = f"lb:{board_type}:xp"
    rank = await redis_client.zrevrank(key, user_id)
    score = await redis_client.zscore(key, user_id)
    total = await redis_client.zcard(key)

    return {
        "rank": (rank + 1) if rank is not None else None,
        "xp": int(score) if score else 0,
        "total_users": total,
        "percentile": round((1 - (rank / max(total, 1))) * 100, 1) if rank is not None else 0
    }


async def cache_user_profile(user_id: str, name: str, level: int):
    """Cache user profile data in Redis for leaderboard display."""
    await redis_client.hset(f"user:{user_id}:profile", mapping={
        "name": name,
        "level": str(level)
    })
    await redis_client.expire(f"user:{user_id}:profile", 3600)
