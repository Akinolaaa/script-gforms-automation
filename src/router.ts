import express from 'express'
import googleFormsRouter from './domains/google-forms/google-forms.routes'


const appRouter = express.Router()

appRouter.use("/api/google-forms", googleFormsRouter);

export default appRouter