import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Heart,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface Skill {
  id: number;
  title: string;
  teacher: string;
  category: string;
  rating: number;
  students: number;
  price: number;
  location: string;
  availability: string;
  description: string;
  badge?: string;
  teacherProfilePicture?: string;
}

interface SkillMarketplaceProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

export function SkillMarketplace({
  userData,
  onNavigate,
}: SkillMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [availableNow, setAvailableNow] = useState(false);
  const [availableToday, setAvailableToday] = useState(false);
  const [availableWeek, setAvailableWeek] = useState(false);
  const [likedSkills, setLikedSkills] = useState<string[]>([]);

  const handleLikeToggle = (skillId: string) => {
    setLikedSkills((prevLikedSkills) =>
      prevLikedSkills.includes(skillId)
        ? prevLikedSkills.filter((id) => id !== skillId)
        : [...prevLikedSkills, skillId]
    );
  };

  const [availabilityFilters, setAvailabilityFilters] = useState({
    availableNow: false,
    availableToday: false,
    availableWeek: false,
  });

  const skillCategories = [
    { id: "all", name: "All Categories", icon: "📚" },
    { id: "programming", name: "Programming", icon: "💻" },
    { id: "design", name: "Design", icon: "🎨" },
    { id: "languages", name: "Languages", icon: "🗣️" },
    { id: "music", name: "Music", icon: "🎵" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "cooking", name: "Cooking", icon: "👨‍🍳" },
    { id: "photography", name: "Photography", icon: "📸" },
    { id: "writing", name: "Writing", icon: "✍️" },
  ];

  const allSkills: Skill[] = [
    {
      id: 1,
      title: "Master JavaScript in 30 Days",
      teacher: "Sarah Chen",
      category: "programming",
      rating: 4.9,
      students: 1247,
      price: 25,
      location: "San Francisco, CA",
      availability: "Available now",
      description:
        "Comprehensive JavaScript course covering modern ES6+ features.",
      badge: "Bestseller",
      teacherProfilePicture: undefined,
    },
    {
      id: 2,
      title: "Spanish Conversation Practice",
      teacher: "Carlos Rodriguez",
      category: "languages",
      rating: 4.8,
      students: 856,
      price: 20,
      location: "Barcelona, Spain",
      availability: "Available today",
      description: "Improve your Spanish speaking skills with native speaker.",
      badge: "New",
      teacherProfilePicture: undefined,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      teacher: "Emma Thompson",
      category: "design",
      rating: 5.0,
      students: 623,
      price: 35,
      location: "London, UK",
      availability: "Tomorrow",
      description:
        "Learn design principles and create stunning user interfaces.",
      badge: "Popular",
      teacherProfilePicture: undefined,
    },
    {
      id: 4,
      title: "Python for Beginners",
      teacher: "John Smith",
      category: "programming",
      rating: 4.7,
      students: 945,
      price: 22,
      location: "New York, NY",
      availability: "Available now",
      description:
        "Learn Python programming from scratch with hands-on projects.",
      teacherProfilePicture: undefined,
    },
    {
      id: 5,
      title: "Guitar Lessons - Beginner to Pro",
      teacher: "Mike Johnson",
      category: "music",
      rating: 4.9,
      students: 532,
      price: 30,
      location: "Los Angeles, CA",
      availability: "Available today",
      description: "Master guitar playing with personalized lessons.",
      teacherProfilePicture: undefined,
    },
    {
      id: 6,
      title: "French Conversation Classes",
      teacher: "Marie Dubois",
      category: "languages",
      rating: 4.8,
      students: 378,
      price: 28,
      location: "Paris, France",
      availability: "Tomorrow",
      description: "Improve your French speaking skills with native speaker.",
      teacherProfilePicture: undefined,
    },
    {
      id: 7,
      title: "Digital Photography Masterclass",
      teacher: "Alex Chen",
      category: "photography",
      rating: 4.6,
      students: 267,
      price: 40,
      location: "Tokyo, Japan",
      availability: "This week",
      description: "Learn professional photography techniques and editing.",
      teacherProfilePicture: undefined,
    },
    {
      id: 8,
      title: "Italian Cooking Secrets",
      teacher: "Giovanni Rossi",
      category: "cooking",
      rating: 4.9,
      students: 421,
      price: 35,
      location: "Rome, Italy",
      availability: "Available now",
      description: "Discover authentic Italian recipes and cooking techniques.",
      teacherProfilePicture: undefined,
    },
    {
      id: 9,
      title: "React & Next.js Development",
      teacher: "David Park",
      category: "programming",
      rating: 4.8,
      students: 892,
      price: 32,
      location: "Seoul, Korea",
      availability: "Available now",
      description: "Build modern web applications with React and Next.js.",
      teacherProfilePicture: undefined,
    },
    {
      id: 10,
      title: "Watercolor Painting",
      teacher: "Sophie Martin",
      category: "design",
      rating: 4.7,
      students: 234,
      price: 28,
      location: "Amsterdam, NL",
      availability: "Tomorrow",
      description: "Create beautiful watercolor art with expert guidance.",
      teacherProfilePicture: undefined,
    },
  ];

  const filteredSkills = allSkills.filter((skill) => {
    const matchesSearch =
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || skill.category === selectedCategory;
    const matchesPrice =
      skill.price >= priceRange[0] && skill.price <= priceRange[1];
    const matchesRating = skill.rating >= minRating;
    const matchesAvailability =
      (!availabilityFilters.availableNow &&
        !availabilityFilters.availableToday &&
        !availabilityFilters.availableWeek) ||
      (availabilityFilters.availableNow &&
        skill.availability === "Available now") ||
      (availabilityFilters.availableToday &&
        skill.availability === "Available today") ||
      (availabilityFilters.availableWeek && skill.availability === "This week");
    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesRating &&
      matchesAvailability
    );
  });

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "students":
        return b.students - a.students;
      default:
        return 0;
    }
  });

  return (
    <div className="h-full overflow-hidden flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Skill Marketplace
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Find the perfect teacher for your learning journey
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search skills or teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-neutral-200"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 h-11 bg-neutral-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem className="hover:bg-neutral-200" value="rating">
                  Highest Rated
                </SelectItem>
                <SelectItem className="hover:bg-neutral-200" value="students">
                  Most Popular
                </SelectItem>
                <SelectItem className="hover:bg-neutral-200" value="price-low">
                  Price: Low to High
                </SelectItem>
                <SelectItem className="hover:bg-neutral-200" value="price-high">
                  Price: High to Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Filters Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-sm mb-3 text-gray-900">
                Categories
              </h3>
              <div className="space-y-2">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="flex-1 text-left">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-sm mb-3 text-gray-900">
                Price Range (credits/hour)
              </h3>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{priceRange[0]} credits</span>
                  <span>{priceRange[1]} credits</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold text-sm mb-3 text-gray-900">
                Minimum Rating
              </h3>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      minRating === rating
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{rating > 0 ? `${rating}+` : "All"}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Availability */}
            <div>
              <h3 className="font-semibold text-sm mb-3 text-gray-900">
                Availability
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available-now"
                    checked={availabilityFilters.availableNow}
                    onChange={(e) =>
                      setAvailabilityFilters((prev) => ({
                        ...prev,
                        availableNow: e.target.checked,
                      }))
                    }
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor="available-now"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Available now
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available-today"
                    checked={availabilityFilters.availableToday}
                    onChange={(e) =>
                      setAvailabilityFilters((prev) => ({
                        ...prev,
                        availableToday: e.target.checked,
                      }))
                    }
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor="available-today"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Available today
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available-week"
                    checked={availabilityFilters.availableWeek}
                    onChange={(e) =>
                      setAvailabilityFilters((prev) => ({
                        ...prev,
                        availableWeek: e.target.checked,
                      }))
                    }
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor="available-week"
                    className="text-sm font-normal cursor-pointer"
                  >
                    This week
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {sortedSkills.length}
                  </span>{" "}
                  results
                  {selectedCategory !== "all" && (
                    <span>
                      {" "}
                      in{" "}
                      <span className="font-semibold text-gray-900">
                        {
                          skillCategories.find((c) => c.id === selectedCategory)
                            ?.name
                        }
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 bg-white">
              {sortedSkills.map((skill) => (
                <Card
                  key={skill.id}
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => onNavigate("publicProfile")}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {skill.badge && (
                            <Badge
                              variant={
                                skill.badge === "Bestseller"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs bg-black text-white"
                            >
                              {skill.badge}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {skill.title}
                        </CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikeToggle(String(skill.id));
                        }}
                      >
                        <Heart
                           className={`w-5 h-5 ${
                             likedSkills.includes(String(skill.id))
                               ? "text-red-500"
                               : "text-gray-400"
                           } hover:text-red-500`}
                           fill={likedSkills.includes(String(skill.id)) ? "currentColor" : "none"}
                           stroke="currentColor"
                         />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {skill.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        {skill.teacherProfilePicture ? (
                          <AvatarImage src={skill.teacherProfilePicture} alt={skill.teacher} />
                        ) : (
                          <AvatarFallback className="text-xs w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {skill.teacher
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{skill.teacher}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {skill.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{skill.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{skill.students.toLocaleString()} students</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <Clock className="w-4 h-4" />
                      {skill.availability}
                    </div>

                    <Separator className="bg-gray-300" />

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          {skill.price}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          credits/hr
                        </span>
                      </div>
                      <Button
                        className="bg-black text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("booking");
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedSkills.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No skills found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setPriceRange([0, 100]);
                    setMinRating(0);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
