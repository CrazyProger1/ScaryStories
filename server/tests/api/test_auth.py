from tests.conftest import client


def test_register():
    response = client.post('/users/register', json={
        'email': 'user@example.com',
        'password': 'string',
        'is_active': True,
        'is_superuser': False,
        'is_verified': False,
        'nickname': 'string'
    })

    assert response.status_code == 201


def test_login():
    response = client.post('/users/login', json={
        'email': 'user@example.com',
        'password': 'string',
    })

    assert response.status_code == 200
