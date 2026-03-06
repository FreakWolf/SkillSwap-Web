import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Plus, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Separator } from "./ui/separator";

interface CalendarViewProps {
  userData: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function CalendarView({ onNavigate }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock sessions data
  const sessions = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      participant: "Alex Johnson",
      type: "teaching",
      date: "2024-03-15",
      time: "10:00 AM",
      duration: 60,
      location: "virtual",
      status: "confirmed",
      credits: 25,
      avatar: "",
    },
    {
      id: 2,
      title: "Spanish Conversation",
      participant: "Carlos Rodriguez",
      type: "learning",
      date: "2024-03-15",
      time: "2:00 PM",
      duration: 45,
      location: "virtual",
      status: "confirmed",
      credits: 20,
      avatar: "",
    },
    {
      id: 3,
      title: "React Components",
      participant: "Emma Thompson",
      type: "teaching",
      date: "2024-03-16",
      time: "11:00 AM",
      duration: 90,
      location: "virtual",
      status: "pending",
      credits: 35,
      avatar: "",
    },
    {
      id: 4,
      title: "Python Data Science",
      participant: "John Smith",
      type: "learning",
      date: "2024-03-17",
      time: "3:00 PM",
      duration: 60,
      location: "virtual",
      status: "confirmed",
      credits: 30,
      avatar: "",
    },
    {
      id: 5,
      title: "UI/UX Design Review",
      participant: "Sarah Chen",
      type: "learning",
      date: "2024-03-18",
      time: "4:00 PM",
      duration: 75,
      location: "virtual",
      status: "confirmed",
      credits: 40,
      avatar: "",
    },
  ];

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getSessionsForDate = (date: string) => {
    return sessions.filter((session) => session.date === date);
  };

  const todaySessions = sessions.filter((s) => s.date === "2024-03-15");
  const upcomingSessions = sessions.filter(
    (s) => new Date(s.date) > new Date("2024-03-15"),
  );

  return (
    <div className="h-full overflow-hidden flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Calendar</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage your learning and teaching sessions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={viewMode}
              onValueChange={(value: "week" | "month") => setViewMode(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week View</SelectItem>
                <SelectItem value="month">Month View</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => onNavigate("marketplace")} className="hidden sm:flex">
              <Plus className="w-4 h-4 mr-2" />
              Book Session
            </Button>
            <Button
              variant="outline"
              className="sm:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Calendar Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-full sm:w-80 bg-white border-r border-gray-200 overflow-y-auto transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 sm:p-6">
            {/* Mini Calendar */}
            <div className="mb-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setIsSidebarOpen(false); // Close sidebar on date selection
                }}
                className="rounded-md border"
              />
            </div>

            <Separator className="my-6" />

            {/* Today's Sessions */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3">Today's Sessions</h3>
              <div className="space-y-3">
                {todaySessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={
                          session.type === "teaching" ? "secondary" : "default"
                        }
                        className="text-xs"
                      >
                        {session.type === "teaching" ? "Teaching" : "Learning"}
                      </Badge>
                      <span className="text-xs text-gray-600">
                        {session.time}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm mb-1">
                      {session.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <User className="w-3 h-3" />
                      {session.participant}
                    </div>
                  </div>
                ))}
                {todaySessions.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No sessions today
                  </p>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Upcoming Sessions */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Upcoming Sessions</h3>
              <div className="space-y-3">
                {upcomingSessions.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={
                          session.type === "teaching" ? "secondary" : "default"
                        }
                        className="text-xs"
                      >
                        {session.type === "teaching" ? "Teaching" : "Learning"}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">
                      {session.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                      <User className="w-3 h-3" />
                      {session.participant}
                    </div>
                    <div className="text-xs text-gray-600">
                      {session.date} at {session.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Calendar View */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Calendar Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">March 2024</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Learning
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Teaching
                </Badge>
              </div>
            </div>

            {viewMode === "week" ? (
              /* Week View */
              <div className="border rounded-lg overflow-x-auto">
                {/* Week Header */}
                <div className="grid grid-cols-8 border-b bg-gray-50 min-w-[700px]">
                  <div className="p-3 border-r" /> {/* Time column */}
                  {weekDays.map((day, index) => (
                    <div
                      key={day}
                      className="p-3 text-center border-r last:border-r-0"
                    >
                      <div className="font-medium text-sm">{day}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {11 + index}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                <div className="divide-y min-w-[700px]">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className="grid grid-cols-8 hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-3 border-r bg-gray-50 text-sm text-gray-600">
                        {time}
                      </div>
                      {weekDays.map((day, dayIndex) => (
                        <div
                          key={`${day}-${time}`}
                          className="p-2 border-r last:border-r-0 min-h-16 relative"
                        >
                          {/* Render sessions for this time slot */}
                          {dayIndex === 0 && time === "10:00 AM" && (
                            <div className="absolute inset-1 bg-purple-100 border border-purple-300 rounded p-2 cursor-pointer hover:shadow-md transition-shadow">
                              <div className="text-xs font-medium text-purple-900 mb-1">
                                JavaScript Fundamentals
                              </div>
                              <div className="text-xs text-purple-700">
                                Alex Johnson
                              </div>
                            </div>
                          )}
                          {dayIndex === 0 && time === "2:00 PM" && (
                            <div className="absolute inset-1 bg-blue-100 border border-blue-300 rounded p-2 cursor-pointer hover:shadow-md transition-shadow">
                              <div className="text-xs font-medium text-blue-900 mb-1">
                                Spanish Conversation
                              </div>
                              <div className="text-xs text-blue-700">
                                Carlos Rodriguez
                              </div>
                            </div>
                          )}
                          {dayIndex === 1 && time === "11:00 AM" && (
                            <div className="absolute inset-1 bg-purple-100 border border-purple-300 rounded p-2 cursor-pointer hover:shadow-md transition-shadow">
                              <div className="text-xs font-medium text-purple-900 mb-1">
                                React Components
                              </div>
                              <div className="text-xs text-purple-700">
                                Emma Thompson
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Month View */
              <div className="border rounded-lg overflow-x-auto">
                <div className="grid grid-cols-7 border-b bg-gray-50 min-w-[500px]">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="p-3 text-center border-r last:border-r-0 font-medium text-sm"
                      >
                        {day}
                      </div>
                    ),
                  )}
                </div>
                <div className="grid grid-cols-7 min-w-[500px]">
                  {Array.from({ length: 35 }).map((_, index) => {
                    const dayNum = index - 4 + 1;
                    const isCurrentMonth = dayNum > 0 && dayNum <= 31;
                    const dateStr = isCurrentMonth
                      ? `2024-03-${String(dayNum).padStart(2, "0")}`
                      : "";
                    const daySessions = dateStr
                      ? getSessionsForDate(dateStr)
                      : [];

                    return (
                      <div
                        key={index}
                        className={`min-h-28 p-2 border-r border-b last:border-r-0 ${
                          !isCurrentMonth ? "bg-gray-50" : "hover:bg-gray-50"
                        }`}
                      >
                        {isCurrentMonth && (
                          <>
                            <div className="text-sm font-medium mb-1">
                              {dayNum}
                            </div>
                            <div className="space-y-1">
                              {daySessions.map((session) => (
                                <div
                                  key={session.id}
                                  className={`text-xs p-1 rounded cursor-pointer truncate ${
                                    session.type === "teaching"
                                      ? "bg-purple-100 text-purple-900"
                                      : "bg-blue-100 text-blue-900"
                                  }`}
                                >
                                  {session.time} {session.title}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
