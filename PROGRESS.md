# Marketplace MVP - Fejlesztési Állapot

## 1. Infrastruktúra és Alapok

- [x] Node.js (ESM, "type": "module") és Express 5 beállítása natív `--watch` móddal
- [x] `server.js` és `app.js` szétválasztása, Fail-Fast MongoDB Atlas kapcsolat
- [x] Központi hibakezelő csővezeték (`AppError`, `catchAsync`, `errorController.js` Dev/Prod szétválasztással, 404 elkapás)

## 2. Vertikális Szelet: User & Auth (Aktuális)

- [x] `User` modell (`validator.isEmail`, `passwordConfirm` validáció, `pre('save')` bcrypt hashelés, `correctPassword` példánymetódus)
- [x] Regisztráció (`POST /api/v1/users/signup`) Mass Assignment védelemmel és JWT token kiállítással (Postmanben tesztelve, 201)
- [x] Adatbázis hibakezelés: MongoDB E11000 duplikált kulcs adapter (`handleDuplicateFieldsDB`)
- [ ] Adatbázis hibakezelés: Mongoose validációs hiba adapter (`handleValidationErrorDB`)
- [ ] Bejelentkezés (`POST /api/v1/users/login`) megírása és tesztelése
- [ ] Hitelesítő middleware (`protect`) és token-ellenőrzés
- [ ] Szerepkör-alapú jogosultságkezelő middleware (`restrictTo`)

## 3. További Vertikális Szeletek (Terv)

- [ ] Product entitás (Model -> Controller -> Router -> CRUD tesztek)
- [ ] Order entitás
- [ ] Review entitás
