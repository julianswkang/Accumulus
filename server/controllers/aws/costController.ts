import 'dotenv/config';
import express from 'express';
import formatController from './formatController';

const costController: any = {};

costController.calcCostTotalLambda = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // 
  return next();
}

costController.calcCostEachLambda = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // 
  return next();
}

costController.calcCostByLambda = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // 
  return next();
}

export default costController;