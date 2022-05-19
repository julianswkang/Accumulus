import express, { Response, Request, NextFunction } from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import cookieController from '../controllers/cookieController';



// Sign up requests
router.post(
  '/signup',
  userController.createUser,
  cookieController.setCookieCredentials,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.confirmation);
  }
);

// Login requests
router.post(
  '/login',
  userController.verifyUser,
  cookieController.setCookieCredentials,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.confirmation);
  }
);

// Sign Out requests
router.post(
  '/signout',
//   userController.verifyUser,
  cookieController.resetCookieCredentials,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.confirmation);
  }
);

router.get(
  '/checkCoookies',
  cookieController.getCookieCredentials,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.userData);
  }
);



export default router;
