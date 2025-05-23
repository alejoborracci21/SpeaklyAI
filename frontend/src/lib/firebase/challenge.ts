// lib/firebase/challenge.ts

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export type Challenge = {
  id: number
  prompt: string
  options: { id: string; text: string }[]
  correct: string
}

export async function getAllChallenges(
  token: string,
  level: string
) {
  return fetch(`${url}/practica-ingles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      category_name: 'Grammar',
      dificulty_level: level,
      tried: 1,
      keywords: [],
    }),
  }).then(res => res.json())
}