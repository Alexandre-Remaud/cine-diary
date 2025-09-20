export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email: string): string | null {
  if (!email) return 'Veuillez saisir un email'
  if (!emailRegex.test(email)) return 'Veuillez saisir un email valide'
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Veuillez saisir un mot de passe'
  if (password.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères'
  return null
}

export function validatePasswordConfirmation(
  password: string,
  confirmPassword: string,
): string | null {
  if (!confirmPassword) return 'Veuillez confirmer votre mot de passe'
  if (password !== confirmPassword) return 'Les mots de passe ne correspondent pas'
  return null
}
