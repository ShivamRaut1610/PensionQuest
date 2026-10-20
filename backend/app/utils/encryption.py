from cryptography.fernet import Fernet
import base64

from app.config import settings


def get_fernet():
    key = base64.urlsafe_b64encode(settings.AES_KEY.encode()[:32].ljust(32, b'0'))
    return Fernet(key)


def encrypt(plaintext: str) -> str:
    f = get_fernet()
    return f.encrypt(plaintext.encode()).decode()


def decrypt(ciphertext: str) -> str:
    f = get_fernet()
    return f.decrypt(ciphertext.encode()).decode()
