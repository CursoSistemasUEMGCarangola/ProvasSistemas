import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Retorna a data no formato YYYY-MM-DD considerando o fuso horário oficial (America/Sao_Paulo).
 */
export function getBrasiliaDateString(date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return formatter.format(date)
}

/**
 * Retorna o timestamp ISO em UTC correspondente ao início do dia (00:00:00) de hoje no fuso de Brasília.
 */
export function getBrasiliaStartOfToday(): string {
  const dateStr = getBrasiliaDateString()
  return new Date(`${dateStr}T00:00:00-03:00`).toISOString()
}

/**
 * Retorna os limites { startOfDay, endOfDay } em UTC ISO para o dia da data informada no fuso de Brasília.
 */
export function getBrasiliaDayBounds(dateOrIso: string | Date = new Date()): { startOfDay: string; endOfDay: string } {
  const dateObj = typeof dateOrIso === 'string' ? new Date(dateOrIso) : dateOrIso
  const dateStr = getBrasiliaDateString(dateObj)
  const startOfDay = new Date(`${dateStr}T00:00:00-03:00`).toISOString()
  const endOfDay = new Date(`${dateStr}T23:59:59.999-03:00`).toISOString()
  return { startOfDay, endOfDay }
}

