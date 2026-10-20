import logging

logger = logging.getLogger("pensionquest.notifications")

NOTIFICATION_TEMPLATES = {
    "daily_quest": {
        "en": {
            "title": "🎯 Your Daily Quest Awaits!",
            "body": "Complete today's NPS mission and earn {xp} XP. Keep your {streak}-day streak alive!"
        },
        "hi": {
            "title": "🎯 आपका दैनिक क्वेस्ट इंतजार कर रहा है!",
            "body": "आज का NPS मिशन पूरा करें और {xp} XP कमाएं। अपनी {streak} दिन की स्ट्रीक बनाए रखें!"
        }
    },
    "contribution_nudge": {
        "en": {
            "title": "💰 Time for Your NPS Contribution!",
            "body": "You're ₹{amount} away from your next milestone badge. Contribute today!"
        },
        "hi": {
            "title": "💰 NPS योगदान का समय!",
            "body": "आप अपने अगले मील-स्टोन बैज से ₹{amount} दूर हैं। आज योगदान करें!"
        }
    },
    "badge_unlocked": {
        "en": {
            "title": "🏆 Badge Unlocked: {badge_name}!",
            "body": "Congratulations! Share your achievement with friends!"
        },
        "hi": {
            "title": "🏆 बैज अनलॉक: {badge_name}!",
            "body": "बधाई! अपनी उपलब्धि दोस्तों के साथ साझा करें!"
        }
    },
    "streak_reminder": {
        "en": {
            "title": "⚠️ Don't break your {streak}-day streak!",
            "body": "Complete today's quest before midnight to keep going!"
        },
        "hi": {
            "title": "⚠️ अपनी {streak} दिन की स्ट्रीक मत तोड़ें!",
            "body": "स्ट्रीक जारी रखने के लिए आधी रात से पहले आज का क्वेस्ट पूरा करें!"
        }
    }
}


async def send_push_notification(
    fcm_token: str,
    notification_type: str,
    lang: str = "en",
    data: dict = {}
):
    """Send a push notification to a specific device via FCM."""
    template = NOTIFICATION_TEMPLATES.get(notification_type, {}).get(lang, {})
    if not template:
        logger.warning(f"No template found for type={notification_type}, lang={lang}")
        return None

    title = template["title"].format(**data)
    body = template.get("body", "").format(**data)

    try:
        from firebase_admin import messaging

        message = messaging.Message(
            notification=messaging.Notification(title=title, body=body),
            token=fcm_token,
            data={k: str(v) for k, v in data.items()},
            android=messaging.AndroidConfig(priority="high"),
            apns=messaging.APNSConfig(
                payload=messaging.APNSPayload(
                    aps=messaging.Aps(sound="default")
                )
            )
        )

        response = messaging.send(message)
        logger.info(f"FCM sent: {response}")
        return response
    except Exception as e:
        logger.error(f"FCM send error: {e}")
        return None
