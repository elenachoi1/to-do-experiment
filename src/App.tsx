import { useMemo, useState } from "react"
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Circle,
  CircleHelp,
  ClipboardList,
  Inbox,
  ListFilter,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sun,
  UserCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type View = "inbox" | "today" | "upcoming" | "completed"
type Priority = "none" | "low" | "medium" | "high"

type Task = {
  id: number
  title: string
  description: string
  dueDate: string
  priority: Priority
  completed: boolean
}

const initialTasks: Task[] = [
  { id: 1, title: "Finalize the Q3 launch checklist", description: "Confirm owners and unblock the remaining launch tasks.", dueDate: "2026-08-11", priority: "high", completed: false },
  { id: 2, title: "Review homepage copy", description: "Leave feedback for the marketing team.", dueDate: "2026-08-11", priority: "medium", completed: false },
  { id: 3, title: "Book research interviews", description: "Schedule four customer calls for next week.", dueDate: "2026-08-13", priority: "medium", completed: false },
  { id: 4, title: "Send August invoices", description: "Export and send the finalized invoices.", dueDate: "2026-08-15", priority: "low", completed: false },
  { id: 5, title: "Update project brief", description: "Add the decisions from Monday's planning session.", dueDate: "2026-08-10", priority: "none", completed: true },
]

const navItems: { value: View; label: string; icon: typeof Inbox }[] = [
  { value: "inbox", label: "Inbox", icon: Inbox },
  { value: "today", label: "Today", icon: Sun },
  { value: "upcoming", label: "Upcoming", icon: CalendarDays },
  { value: "completed", label: "Completed", icon: CheckCircle2 },
]

const priorityStyles: Record<Exclude<Priority, "none">, string> = {
  high: "bg-priority-high-bg text-priority-high-text",
  medium: "bg-priority-medium-bg text-priority-medium-text",
  low: "bg-priority-low-bg text-priority-low-text",
}

const today = "2026-08-11"

function formatDate(value: string) {
  if (!value) return "No due date"
  if (value === today) return "Today"
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(`${value}T12:00:00`))
}

type NavigationPanelProps = {
  counts: Record<View, number>
  view: View
  onNavigate: (view: View) => void
  onAddTask: () => void
}

function NavigationPanel({ counts, view, onNavigate, onAddTask }: NavigationPanelProps) {
  return (
    <div className="flex h-full flex-col bg-muted/30 p-4">
      <div className="flex items-center gap-3 px-2 py-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2 className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-primary">Momentum</p>
          <p className="text-[11px] text-muted-foreground">Productivity workspace</p>
        </div>
      </div>

      <Button className="mt-5 w-full justify-start" onClick={onAddTask}>
        <Plus data-icon="inline-start" /> Add task
      </Button>

      <nav className="mt-6 flex flex-col gap-1" aria-label="Task views">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = view === item.value
          return (
            <button
              key={item.value}
              className={cn(
                "flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors",
                active
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              onClick={() => onNavigate(item.value)}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
              <span className="ml-auto text-xs tabular-nums">{counts[item.value]}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t pt-3">
        <button className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Settings className="size-4" /> Settings
        </button>
        <button className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <CircleHelp className="size-4" /> Help
        </button>
      </div>
    </div>
  )
}

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [view, setView] = useState<View>("today")
  const [search, setSearch] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<Priority>("none")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [draft, setDraft] = useState({ title: "", description: "", dueDate: today, priority: "none" as Priority })

  const counts = useMemo<Record<View, number>>(() => ({
    inbox: tasks.filter((task) => !task.completed).length,
    today: tasks.filter((task) => !task.completed && task.dueDate === today).length,
    upcoming: tasks.filter((task) => !task.completed && task.dueDate > today).length,
    completed: tasks.filter((task) => task.completed).length,
  }), [tasks])

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesView = view === "completed"
      ? task.completed
      : view === "inbox"
        ? true
        : view === "today"
          ? task.dueDate === today
          : task.dueDate > today
    const matchesSearch = `${task.title} ${task.description}`.toLowerCase().includes(search.toLowerCase())
    const matchesPriority = priorityFilter === "none" || task.priority === priorityFilter
    return matchesView && matchesSearch && matchesPriority
  }), [tasks, view, search, priorityFilter])

  const openNewTask = () => {
    setEditingTask(null)
    setDraft({ title: "", description: "", dueDate: today, priority: "none" })
    setDialogOpen(true)
  }

  const openEditTask = (task: Task) => {
    setEditingTask(task)
    setDraft({ title: task.title, description: task.description, dueDate: task.dueDate, priority: task.priority })
    setDialogOpen(true)
  }

  const openTask = (task: Task) => {
    setSelectedTask(task)
  }

  const saveTask = () => {
    if (!draft.title.trim()) return
    if (editingTask) {
      setTasks((current) => current.map((task) => task.id === editingTask.id ? { ...task, ...draft, title: draft.title.trim() } : task))
    } else {
      setTasks((current) => [{ id: Date.now(), completed: false, ...draft, title: draft.title.trim() }, ...current])
    }
    setDialogOpen(false)
  }

  const toggleTask = (id: number) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const currentLabel = navItems.find((item) => item.value === view)?.label ?? "Tasks"
  const activeSelectedTask = selectedTask ? tasks.find((task) => task.id === selectedTask.id) ?? null : null
  const completedPercentage = tasks.length > 0 ? Math.round((counts.completed / tasks.length) * 100) : 0

  return (
    <TooltipProvider>
      <div className="min-h-dvh bg-background text-foreground">
        <div className="flex min-h-dvh min-w-[1280px]">
          <aside className="w-64 shrink-0 border-r bg-muted/30">
            <div className="sticky top-0 h-dvh">
              <NavigationPanel counts={counts} view={view} onNavigate={setView} onAddTask={openNewTask} />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <header className="sticky top-0 z-20 flex h-[76px] items-center gap-4 border-b bg-background px-8">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks…" className="pl-9" />
              </div>
              <Button onClick={openNewTask}>
                <Plus data-icon="inline-start" /> Add task
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notifications"><Bell /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">EC</span>
                    <span>Elena</span>
                    <ChevronDown className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem><UserCircle /> Profile</DropdownMenuItem>
                    <DropdownMenuItem><Settings /> Settings</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            <main className="min-h-[calc(100dvh-4.75rem)] bg-muted/15 px-8 py-8">
              <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_320px] gap-6">
                <section className="min-w-0">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-1 text-sm font-medium text-primary">Tuesday, August 11</p>
                    <h1 className="text-3xl font-semibold tracking-tight">{currentLabel}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {view === "completed" ? "A record of everything you've finished." : `${visibleTasks.length} task${visibleTasks.length === 1 ? "" : "s"} remaining`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as Priority)}>
                      <SelectTrigger className="w-40">
                        <ListFilter />
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="none">All priorities</SelectItem>
                          <SelectItem value="high">High priority</SelectItem>
                          <SelectItem value="medium">Medium priority</SelectItem>
                          <SelectItem value="low">Low priority</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-8 overflow-hidden rounded-xl border bg-background shadow-sm">
                  {visibleTasks.length > 0 ? visibleTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className={cn(
                        "group flex min-h-16 items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/50",
                        index > 0 && "border-t",
                      )}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        aria-label={`Mark ${task.title} ${task.completed ? "incomplete" : "complete"}`}
                      />
                      <button className="min-w-0 flex-1 text-left" onClick={() => openTask(task)}>
                        <p className={cn("truncate text-sm font-medium leading-snug", task.completed && "text-muted-foreground line-through")}>{task.title}</p>
                        <p className="mt-1 truncate text-xs text-muted-foreground">{task.description || "No description"}</p>
                      </button>
                      {task.priority !== "none" && (
                        <Badge variant="outline" className={cn("shrink-0 border-transparent capitalize", priorityStyles[task.priority])}>
                          {task.priority}
                        </Badge>
                      )}
                      <div className="flex w-24 items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="size-3.5" /> {formatDate(task.dueDate)}
                      </div>
                      <Tooltip>
                        <DropdownMenu>
                          <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="-mr-2 shrink-0" aria-label={`Actions for ${task.title}`}><MoreHorizontal /></Button>
                            </DropdownMenuTrigger>
                          </TooltipTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                              <DropdownMenuItem onClick={() => openEditTask(task)}>Edit task</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleTask(task.id)}>{task.completed ? "Mark incomplete" : "Mark complete"}</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))}>Delete task</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <TooltipContent>Task actions</TooltipContent>
                      </Tooltip>
                    </div>
                  )) : (
                    <div className="flex flex-col items-center px-6 py-20 text-center">
                      <div className="flex size-12 items-center justify-center rounded-full bg-muted"><Circle className="size-5 text-muted-foreground" /></div>
                      <h2 className="mt-4 font-semibold">No tasks found</h2>
                      <p className="mt-1 max-w-sm text-sm text-muted-foreground">Try another view or filter, or add a new task to get started.</p>
                      <Button className="mt-5" variant="outline" onClick={openNewTask}><Plus data-icon="inline-start" /> Add task</Button>
                    </div>
                  )}
                </div>

                <Button variant="outline" className="mt-4 w-full justify-start text-muted-foreground" onClick={openNewTask}>
                  <Plus data-icon="inline-start" /> Quick add task…
                </Button>
                </section>

                <aside className="flex flex-col gap-4">
                  <div className="rounded-xl border bg-background p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-sm font-semibold">Task details</h2>
                      {activeSelectedTask && (
                        <Button variant="ghost" size="sm" onClick={() => openEditTask(activeSelectedTask)}>Edit</Button>
                      )}
                    </div>
                    {activeSelectedTask ? (
                      <div className="mt-4 flex flex-col gap-3">
                        <div>
                          <p className="text-sm font-medium leading-snug">{activeSelectedTask.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {activeSelectedTask.description || "No description"}
                          </p>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" /> Due</span>
                          <span>{formatDate(activeSelectedTask.dueDate)}</span>
                        </div>
                        {activeSelectedTask.priority !== "none" && (
                          <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                            <span>Priority</span>
                            <Badge variant="outline" className={cn("border-transparent capitalize", priorityStyles[activeSelectedTask.priority])}>
                              {activeSelectedTask.priority}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-3">
                        <p className="text-xs leading-relaxed text-muted-foreground">Select a task from the list to view its details and attachments.</p>
                        <div className="mt-4 flex h-36 items-center justify-center rounded-lg bg-muted/60">
                          <ClipboardList className="size-6 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border bg-background p-4 shadow-sm">
                    <h2 className="text-sm font-semibold">Today&apos;s progress</h2>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Completed</span>
                      <span className="font-medium text-primary">{counts.completed}/{tasks.length}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${completedPercentage}%` }} />
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {counts.today > 0 ? `You have ${counts.today} pending task${counts.today === 1 ? "" : "s"} for today.` : "Everything for today is complete."}
                    </p>
                  </div>
                </aside>
              </div>
            </main>
          </div>
        </div>

      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit task" : "Add a new task"}</DialogTitle>
            <DialogDescription>{editingTask ? "Update the task details below." : "Capture what needs to get done."}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="task-title" className="text-sm font-medium">Task title</label>
              <Input id="task-title" autoFocus value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="What needs to be done?" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="task-description" className="text-sm font-medium">Description</label>
              <Textarea id="task-description" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Add any helpful details…" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="task-date" className="text-sm font-medium">Due date</label>
                <Input id="task-date" type="date" value={draft.dueDate} onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={draft.priority} onValueChange={(value) => setDraft({ ...draft, priority: value as Priority })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">No priority</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveTask} disabled={!draft.title.trim()}>{editingTask ? "Save changes" : "Add task"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}

export default App
