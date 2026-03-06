import { useState } from "react";
import { Clock, Coins, Users, Plus, X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface OfferSkillProps {
  userData: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function OfferSkill({ userData, onNavigate }: OfferSkillProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: "",
    hourlyRate: "",
    sessionLength: "60",
    difficulty: "",
    maxStudents: "1",
    materials: "",
  });

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [newTimeSlot, setNewTimeSlot] = useState("");
  const [objectives, setObjectives] = useState<string[]>([""]);

  const categories = [
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Music",
    "Languages",
    "Photography",
    "Writing",
    "Fitness",
    "Cooking",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const addTimeSlot = () => {
    if (newTimeSlot && !timeSlots.includes(newTimeSlot)) {
      setTimeSlots([...timeSlots, newTimeSlot]);
      setNewTimeSlot("");
    }
  };

  const removeTimeSlot = (slot: string) => {
    setTimeSlots(timeSlots.filter((s) => s !== slot));
  };

  const addObjective = () => {
    setObjectives([...objectives, ""]);
  };

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const handleSubmit = () => {
    console.log("Submitting skill offer:", {
      ...formData,
      selectedDays,
      timeSlots,
      objectives,
    });
    onNavigate("dashboard");
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Offer a Skill
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Share your expertise and teach others
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" onClick={() => onNavigate("dashboard")} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="w-full sm:w-auto">
              <Check className="w-4 h-4 mr-2" />
              Publish Skill
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell students what you'll teach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Skill Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Master JavaScript in 30 Days"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level *</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) =>
                      setFormData({ ...formData, difficulty: value })
                    }
                  >
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="all-levels">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what students will learn and what makes your teaching unique..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Prerequisites</Label>
                <Textarea
                  id="requirements"
                  placeholder="What should students know or have before taking your class?"
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
              <CardDescription>
                What will students be able to do after your session?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {objectives.map((objective, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    placeholder={`Objective ${index + 1}`}
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                  />
                  {objectives.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeObjective(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addObjective}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Objective
              </Button>
            </CardContent>
          </Card>

          {/* Session Details */}
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>
                Configure your teaching sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4" />
                      Hourly Rate (credits) *
                    </div>
                  </Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="25"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      setFormData({ ...formData, hourlyRate: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionLength">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Default Session Length
                    </div>
                  </Label>
                  <Select
                    value={formData.sessionLength}
                    onValueChange={(value) =>
                      setFormData({ ...formData, sessionLength: value })
                    }
                  >
                    <SelectTrigger id="sessionLength">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStudents">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Max Students
                    </div>
                  </Label>
                  <Select
                    value={formData.maxStudents}
                    onValueChange={(value) =>
                      setFormData({ ...formData, maxStudents: value })
                    }
                  >
                    <SelectTrigger id="maxStudents">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Private)</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10 (Group)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Materials Needed</Label>
                <Textarea
                  placeholder="List any materials, software, or tools students should have..."
                  value={formData.materials}
                  onChange={(e) =>
                    setFormData({ ...formData, materials: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>
                When are you available to teach?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Available Days</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {days.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={selectedDays.includes(day)}
                        onCheckedChange={() => handleDayToggle(day)}
                      />
                      <Label
                        htmlFor={day}
                        className="cursor-pointer font-normal"
                      >
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Time Slots</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="time"
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    placeholder="Add time slot"
                    className="w-full"
                  />
                  <Button onClick={addTimeSlot} variant="outline" className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                {timeSlots.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {timeSlots.map((slot) => (
                      <Badge
                        key={slot}
                        variant="secondary"
                        className="gap-2 px-3 py-1.5"
                      >
                        {slot}
                        <button onClick={() => removeTimeSlot(slot)}>
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onNavigate("dashboard")} className="w-full sm:w-auto">
              Save as Draft
            </Button>
            <Button onClick={handleSubmit} size="lg" className="w-full sm:w-auto">
              <Check className="w-5 h-5 mr-2" />
              Publish Skill Offering
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
