import type { Request, Response } from "express";
import type { AuthError } from "../types/auth.types";
import {
  forgotPassword,
  getCurrentUserByToken,
  login,
  register,
  resetPassword,
} from "../services/auth.service";

function handleAuthError(res: Response, error: unknown) {
  const knownError = error as AuthError;

  if (knownError?.status && knownError?.message) {
    return res.status(knownError.status).json({
      message: knownError.message,
      errors: knownError.errors,
    });
  }

  return res.status(500).json({
    message: "Terjadi kesalahan internal server.",
  });
}

function getBearerToken(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

export async function registerController(req: Request, res: Response) {
  try {
    const result = await register(req.body);
    return res.status(result.status).json({
      message: result.message,
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const result = await login(req.body);
    return res.status(result.status).json({
      message: result.message,
      token: result.token,
      data: result.data,
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
}

export async function meController(req: Request, res: Response) {
  const token = getBearerToken(req);

  if (!token) {
    return res.status(401).json({
      message: "Akses ditolak. Token tidak ditemukan.",
    });
  }

  try {
    const result = await getCurrentUserByToken(token);
    return res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
}

export async function forgotPasswordController(req: Request, res: Response) {
  try {
    const result = await forgotPassword(req.body);
    return res.status(result.status).json({
      message: result.message,
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
}

export async function resetPasswordController(req: Request, res: Response) {
  try {
    const result = await resetPassword(req.body);
    return res.status(result.status).json({
      message: result.message,
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
}
