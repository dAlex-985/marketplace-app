class AppError extends Error {
  constructor(message, statusCode) {
    // a super() meghívásával átadjuk a hibaüzenetet az ősosztálynak. Így a JavaScript beállítja a natív message tulajdonságot, és a hiba valódi Error példányként viselkedik. A JavaScript szigorú motorikus szabálya: egy leszármazott osztályban tilos hozzányúlni a this-hez addig, amíg a super() le nem futott, hiszen a gyári alapoknak el kell készülniük ahhoz, hogy te egyedi dolgokat építhess rá.
    super(message);

    //Eltároljuk a kapott numerikus státuszkódotEltároljuk a kapott numerikus státuszkódot
    this.statusCode = statusCode;

    // A JSend specifikációnk szerint a válaszban jeleznünk kell a státusz jellegét. Ha a kód 4-gyel kezdődik (4xx klienshiba), az érték 'fail', minden más esetben (jellemzően 5xx szerverhiba) 'error' lesz.
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // a globális hibakezelőnk ebből a boolean értékből fogja tudni, hogy a hibát mi magunk dobtuk szándékosan egy üzleti logika miatt (pl. nincs elég készlet a termékből), vagy egy váratlan programozási hiba (bug) történt
    this.isOperational = true;

    // Ez a V8 motor natív metódusa. Gondoskodik arról, hogy a hibanyomkövetésben (stack trace) ne jelenjen meg maga az AppError konstruktorhívás, hanem pontosan az a kódsor legyen a verem tetején, ahol a hiba ténylegesen keletkezett.
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
