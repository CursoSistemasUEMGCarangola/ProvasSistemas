import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"
import { Prova } from '@/types'

interface NextExamAlertProps {
  exams?: Prova[]
  exam?: Prova | null
}

export function NextExamAlert({ exams, exam }: NextExamAlertProps) {
  const examList = exams && exams.length > 0 ? exams : exam ? [exam] : []
  if (examList.length === 0) return null

  const firstExam = examList[0]
  const dateObj = new Date(firstExam.data_hora_inicio)
  const formattedDate = dateObj.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'long', day: '2-digit', month: 'long' })
  const formattedTime = dateObj.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' })
  const timeDisplay = formattedTime === '00:00' ? ' - EaD' : ` às ${formattedTime}`;

  return (
    <Card className="border-l-4 border-l-secondary shadow-md bg-secondary/5 [--card-spacing:0.5rem]">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <CardDescription className="text-secondary font-semibold uppercase tracking-wider text-xs mb-1">
              {examList.length > 1 ? 'Fique Atento: Próximas Provas' : 'Fique Atento: Próxima Prova'}
            </CardDescription>
            <div className="flex items-center text-sm font-medium text-foreground gap-1.5 mt-0.5">
              <CalendarDays className="h-4 w-4 text-secondary shrink-0" />
              <span className="capitalize">{formattedDate}{timeDisplay}</span>
            </div>
          </div>
          {examList.length > 1 && (
            <Badge variant="outline" className="text-xs bg-background/80 font-medium">
              {examList.length} avaliações neste horário
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-1 space-y-3">
        {examList.map((item, index) => (
          <div 
            key={item.id || index} 
            className={`${index > 0 ? "pt-3 border-t border-border/50" : ""} flex flex-col gap-1`}
          >
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="text-lg font-bold leading-snug">
                {item.disciplinas?.nome}
              </CardTitle>
              <Badge variant="secondary" className="text-xs shrink-0">
                {item.tipo_avaliacao}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-0.5">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-secondary" />
                <span>Turma: {item.turmas?.nome}</span>
              </div>
              {item.disciplinas?.professores?.nome && (
                <div>
                  <span>Prof.: {item.disciplinas.professores.nome}</span>
                </div>
              )}
            </div>
            {item.observacoes && (
              <p className="mt-1.5 text-[11px] bg-muted p-2 rounded-md border text-foreground font-bold leading-tight">
                Obs: {item.observacoes}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
