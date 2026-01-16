"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { HistoryItem } from "@/lib/types"

interface HistoryModalProps {
  open: boolean
  onClose: () => void
  history: HistoryItem[]
}

export function HistoryModal({ open, onClose, history }: HistoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Historico de Atividades</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum historico ainda.</p>
              <p className="text-sm mt-1">Complete dias para ver seu progresso aqui!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((item, index) => {
                const date = new Date(item.date)
                const formatted = date.toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">{formatted}</span>
                    <span
                      className={`font-semibold ${
                        item.score >= 80
                          ? "text-emerald-600"
                          : item.score >= 50
                            ? "text-amber-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      {item.score}%
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
