import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold font-mono text-center">Wordsta by fevertrip</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Wordsta is a word-learning application designed to enhance your English vocabulary.
          </p>
          <p>
            Our goal is to help you improve your language skills efficiently, whether you&apos;re preparing for standardized tests like <b>GRE</b> or <b>TOEFL</b>, or simply aiming to expand your lexicon.
          </p>
          <h3 className="text-xl font-semibold mt-6">Features</h3>
          <ul className="list-disc list-inside">
            <li>Swipe to learn new words</li>
            <li>Progress tracking with reset capability</li>
            <li>Multiple word lists (Most challenging, highest frequency, etc.)</li>
            <li>Sorting options: frequency, difficulty and more</li>
          </ul>
          <p className="mt-6">
            Whether you&apos;re a student preparing for exams or an enthusiast looking to broaden your vocabulary, Wordsta can help you get there.
          </p>
        </CardContent>
      </Card>
      <p className="text-sm my-6">
        <Link href="https://fvrtrp.com">fvrtrp.com</Link>
      </p>
    </div>
  )
}