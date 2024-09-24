import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Wordsta by fevertrip</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Wordsta is a word-learning application designed to enhance your English vocabulary.
          </p>
          <p>
            Our goal is to help you improve your language skills efficiently, whether you're preparing for standardized tests like <b>GRE</b> or <b>TOEFL</b>, or simply aiming to expand your lexicon.
          </p>
          <h3 className="text-xl font-semibold mt-6">Key Features</h3>
          <ul className="list-disc list-inside">
            <li>Interactive word swiping for engaging learning</li>
            <li>Multiple word lists catering to various needs (Most challenging, highest frequency, etc.)</li>
            <li>Customizable sorting options: frequency, difficulty and more</li>
            <li>Progress tracking with reset capability</li>
            <li>Option to load random words for diverse learning</li>
          </ul>
          <p className="mt-6">
            Whether you're a student preparing for exams or an enthusiast looking to broaden your vocabulary, Wordsta provides the tools you need to succeed in your language learning journey.
          </p>
        </CardContent>
      </Card>
      <p className="text-sm mt-6">
        <Link href="https://fvrtrp.com">fvrtrp.com</Link>
      </p>
    </div>
  )
}