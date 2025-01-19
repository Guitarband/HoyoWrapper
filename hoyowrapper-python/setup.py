from setuptools import setup, find_packages

setup(
    name='hoyowrapper',
    version='0.1.0',
    packages=find_packages(include=['hoyowrapper']),
    author='Guitarband',
    author_email='preetish_choudhary@outlook.com',
    description='A library for handling interactions with Hoyolab via Python.',
    classifiers=[
        'Programming Language :: Python :: 3',
        'Liscnse :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    install_requires=['requests'],
    setup_requires=[],
    tests_require=[],
    test_suite='tests'
)