# SignIn

## How to use

1. Decide on a secret key (skey) and an destination link (fl)
2. Use those two parameters to make a new QR code in the format of
`Https://attendance.masonhackclub.com/?skey={YOUR_SECRET_KEY}&fl={YOUR_FINAL_LINK_DESTINATION}`
3. Have people scan the QR code and sign in with their google account
4. View results via Firebase's DB. They will be organized by skey and there currently isn't a way to view them without opening up Firebase and looking. 
