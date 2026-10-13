import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import { promisify } from "util";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Please provide email and password!", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);
  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: { user },
  });
});

export const protect = catchAsync(async (req, res, next) => {
  // ebben a változóban tároljuk majd a tokent
  let token;

  // első lépésben megnézzük, hogy létezik-e az authorization mező, és ha igen, hogy a Bearer stringgel kezdődik-e
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // ha a két feltétel teljesül, akkor leválasztjuk a tokent és rátesszük a változóra
    token = req.headers.authorization.split(" ")[1];
  }

  // ha nincs token akkor egyből elutasítjuk a kérést
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }

  // ha van token akkor azt a következő sorban hitelesítjük a szerveren tárolt titkos kulcs segítségével. ha nem járt le, nem volt piszkálva és a mi szerverünk volt kiállítva akkor megkapjuk azon felhasználó ID-jét, akihez tartozik, valamint, hogy mikor volt kiadva.
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // ez még nem elég hogy van érvényes token. meg kell róla bizonyosodni, hogy a felhasználó még engedélyzve van, azaz nem lett törölve az adatbázisból.
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401),
    );
  }

  // nagyon fontos, hogy ha a jelsző megváltozott a token kiadását követően, akkor a token amellyel a műveletet véghez akartuk vinni már érvénytelen.
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401),
    );
  }
  req.user = currentUser;
  next();
});
