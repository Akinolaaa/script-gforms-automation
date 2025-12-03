// import joi from "joi";
// import { Logger } from "../utils/logger";

// const logger = new Logger("AppConfigFactory");

// export default class AppConfigFactory {
// 	public FromEnvVar() {
// 		const envVarsSchema = joi
// 			.object()
// 			.keys({
// 				WHATSAPP_ACCESS_TOKEN: joi.string().required(),
// 				WHATSAPP_PHONE_ID: joi.string().required(),

// 				META_GRAPH_API_VERSION: joi.string().required(),
// 				BVNDLE_DETTY_DEC_ADMIN_URL: joi.string().required(),
// 				SSO_KEY_SECRET: joi.string().required(),
// 				SSO_IV_SECRET: joi.string().required(),
// 				DEFAULT_NFC_OTP: joi.string().required(),
// 			})
// 			.unknown();

// 		const { value: envVars, error } = envVarsSchema
// 			.prefs({ errors: { label: "key" } })
// 			.validate(process.env);

// 		if (error) {
// 			logger.error(
// 				"info",
// 				`Configuration Validation Error ${JSON.stringify(error.message)}`
// 			);
// 			throw new Error(`Config Validation Error: ${error.message}`);
// 		}

// 		return {
// 			environment: envVars.ENV,
// 			port: envVars.PORT,
// 			jwtKey: envVars.JWTKEY,
// 			adminJwtKey: envVars.ADMIN_JWTKEY,
// 			partnerJwtKey: envVars.PARTNER_JWTKEY,
// 			partnerNFCJwtKey: envVars.PARTNER_NFC_JWTKEY,
// 			coinServiceId: envVars.COIN_SERVICE_ID,
// 			walletServiceId: envVars.WALLET_SERVICE_ID,
// 			notifyServiceId: envVars.NOTIFY_SERVICE_ID,
// 			dettyDecServiceId: envVars.DETTY_DEC_SERVICE_ID,
// 			userServiceId: envVars.USER_SERVICE_ID,
// 			ssoServiceId: envVars.SSO_SERVICE_ID,
// 			botApiKey: envVars.BOT_API_KEY,
// 			msJwtKey: envVars.MS_JWTKEY,
// 			otpExpiration: envVars.OTPEXPIRATION,
// 			accessTokenExpiry: envVars.ACCESS_TOKEN_EXPIRY,
// 			refreshTokenExpiry: envVars.REFRESH_TOKEN_EXPIRY,
// 			lassWebLink: envVars.LAAS_WEB_LINK,
// 			keySecret: envVars.KEY_SECRET,
// 			ivSecret: envVars.IV_SECRET,
// 			sql: {
// 				host: envVars.DB_HOST,
// 				dbname: envVars.DB_NAME,
// 				user: envVars.DB_USER,
// 				password: envVars.DB_PASS,
// 				port: envVars.DB_PORT,
// 			},
// 			typeorm: {
// 				entities: [entitiesPath],
// 			},
// 			aws: {
// 				accessKeyId: envVars.AWS_ACCESS_KEY_ID,
// 				accessKeySecret: envVars.AWS_ACCESS_KEY_SECRET,
// 				url: "https://splitar.s3.amazonaws.com",
// 			},
// 			simpu: {
// 				secretKey: envVars.SIMPU_SECRETKEY,
// 				baseUrl: envVars.SIMPU_BASEURL,
// 			},
// 			nodemailer: {
// 				user: envVars.NODEMAILER_EMAIL,
// 				pass: envVars.NODEMAILER_PASS,
// 				host: envVars.NODEMAILER_HOST,
// 			},
// 			paystack: {
// 				secretKey: envVars.PAYSTACK_SECRETKEY,
// 				baseUrl: envVars.PAYSTACK_BASEURL,
// 			},
// 			termii: {
// 				baseUrl: envVars.TERMII_BASEURL,
// 				secretKey: envVars.TERMII_SECRETKEY,
// 				sender: envVars.TERMII_SENDER,
// 			},
// 			coinsService: {
// 				baseUrl: envVars.COINSSERVICE_BASEURL,
// 			},
// 			walletService: {
// 				baseUrl: envVars.WALLET_SERVICE_BASEURL,
// 			},
// 			notifyService: {
// 				baseUrl: envVars.NOTIFY_SERVICE_BASEURL,
// 			},
// 			coinBonus: {
// 				signUp: envVars.SIGNUP_BONUS ? envVars.SIGNUP_BONUS : 5,
// 				referral: envVars.REFERRAL_BONUS ? envVars.REFERRAL_BONUS : 50,
// 				dailyWinner: envVars.DAILY_WINNER ? envVars.DAILY_WINNER : 200,
// 				weeklyWinner: envVars.WEEKLY_WINNER ? envVars.WEEKLY_WINNER : 500,
// 				monthlyWinner: envVars.MONTHLY_WINNER ? envVars.MONTHLY_WINNER : 1000,
// 				yearlyWinner: envVars.YEARLY_WINNER ? envVars.YEARLY_WINNER : 10000,
// 				payPartner: envVars.PAY_PARTNER_BONUS ? envVars.PAY_PARTNER_BONUS : 10,
// 				kycBonus: envVars.KYC_BONUS ? envVars.KYC_BONUS : 10,
// 				shareBvndle: envVars.SHARE_BVNDLE_BONUS
// 					? envVars.SHARE_BVNDLE_BONUS
// 					: 3,
// 				packagePromotionCost: envVars.DAILY_PACKAGE_PROMOTION_COST
// 					? envVars.DAILY_PACKAGE_PROMOTION_COST
// 					: 50,
// 				appTour: envVars.APP_TOUR_BONUS ? envVars.APP_TOUR_BONUS : 5,
// 				vatPercentage: envVars.VAT_PERCENTAGE ? envVars.VAT_PERCENTAGE : 0.075,
// 				coinTransactionPercentage: envVars.COIN_TRANSACTION_PERCENT
// 					? envVars.COIN_TRANSACTION_PERCENT
// 					: 0.075,
// 				cashTransactionPercentage: envVars.CASH_TRANSACTION_PERCENT
// 					? envVars.CASH_TRANSACTION_PERCENT
// 					: 0.075,
// 			},
// 			muuve: {
// 				countryKey: envVars.MUUVE_COUNTRY_KEY,
// 				secretKey: envVars.MUUVE_SECRETKEY,
// 				baseUrl: envVars.MUUVE_BASEURL,
// 				partnerId: envVars.MUUVE_PARTNER_ID,
// 			},
// 			bvndle: {
// 				partnerIds: envVars.BVNDLE_IDS ? envVars.BVNDLE_IDS.split(",") : [],
// 				adminUrl: envVars.BVNDLE_ADMIN_URL,
// 				partnerUrl: envVars.BVNDLE_PARTNER_URL,
// 				gamesPartnerId: envVars.BVNDLE_GAMES_ID,
// 				superAdminId: envVars.BVNDLE_SUPER_ADMIN_ID,
// 				yardId: envVars.BVNDLE_YARD_ID,
// 				userUrl: envVars.BVNDLE_USER_URL,
// 				ssoPartnerId: envVars.BVNDLE_SSO_PARTNER_ID,
// 				dettyDecAdminUrl: envVars.BVNDLE_DETTY_DEC_ADMIN_URL,
// 			},
// 			redis: {
// 				host: envVars.REDIS_HOST,
// 				port: envVars.REDIS_PORT,
// 				password: envVars.REDIS_PASSWORD,
// 			},
// 			oneTimeReferralBonus: envVars.ONE_TIME_REFERRAL_BONUS
// 				? envVars.ONE_TIME_REFERRAL_BONUS
// 				: false,
// 			googleClientId: envVars.GOOGLE_CLIENT_ID,
// 			apple: {
// 				clientId: envVars.APPLE_CLIENT_ID,
// 			},
// 			fez: {
// 				baseUrl: envVars.FEZ_BASEURL,
// 				keyId: envVars.FEZ_APIKEY,
// 				userId: envVars.FEZ_USERID,
// 				password: envVars.FEZ_PASSWORD,
// 				partnerId: envVars.FEZ_PARTNERID,
// 			},
// 			filmhouse: {
// 				baseUrl: envVars.FILMHOUSE_URL,
// 				secretKey: envVars.FILMHOUSE_SECRETKEY,
// 				partnerId: envVars.FILMHOUSE_PARTNER_ID,
// 			},
// 			laasPartnerDashboardLink: envVars.LAAS_PARTNER_DASHBOARD_LINK,
// 			bot: {
// 				userId: envVars.BOT_USER_ID,
// 				whatsAppWebhookToken: envVars.WHATSAPP_WEBHOOK_TOKEN,
// 				whatsappAccessToken: envVars.WHATSAPP_ACCESS_TOKEN,
// 				whatsAppPhoneNumberId: envVars.WHATSAPP_PHONE_ID,
// 				metaGraphApiVersion: envVars.META_GRAPH_API_VERSION,
// 				createAccountFlowId: envVars.WHATSAPP_CREATE_ACCOUNT_FLOW_ID,
// 				createAccountFlowScreen: envVars.WHATSAPP_CREATE_ACCOUNT_FLOW_SCREEN,
// 				verifyEmailFlowId: envVars.WHATSAPP_VERIFY_EMAIL_FLOW_ID,
// 				verifyEmailFlowScreen: envVars.WHATSAPP_VERIFY_EMAIL_FLOW_SCREEN,
// 				transferCoinsFlowId: envVars.WHATSAPP_TRANSFER_COINS_FLOW_ID,
// 				transferCoinsFlowScreen: envVars.WHATSAPP_TRANSFER_COINS_FLOW_SCREEN,
// 				transferCoinsConfirmationFlowId:
// 					envVars.WHATSAPP_TRANSFER_COINS_CONFIRMATION_FLOW_ID,
// 				transferCoinsConfirmationFlowScreen:
// 					envVars.WHATSAPP_TRANSFER_COINS_CONFIRMATION_FLOW_SCREEN,
// 			},
// 			sso: {
// 				keySecret: envVars.SSO_KEY_SECRET,
// 				ivSecret: envVars.SSO_IV_SECRET,
// 			},
// 			defaultNFCOTP: envVars.DEFAULT_NFC_OTP,
// 		};
// 	}
// }
