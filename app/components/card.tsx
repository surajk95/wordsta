import {
    Card,
    CardContent,
  } from "@/components/ui/card"

export default function CardUi({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Card>
            <CardContent>{children}</CardContent>
        </Card>
    )
}