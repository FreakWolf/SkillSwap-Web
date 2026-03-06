import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  Coins,
  Info,
  Star,
  Check,
  MessageCircle
} from 'lucide-react';
import { Separator } from './ui/separator';

interface BookingScreenProps {
  userData: any;
  bookingData?: any;
  onNavigate: (screen: string) => void;
}

export function BookingScreen({ userData, bookingData, onNavigate }: BookingScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [location, setLocation] = useState('virtual');
  const [specialRequests, setSpecialRequests] = useState('');

  // Mock teacher/skill data
  const teacher = {
    name: bookingData?.teacher || 'Sarah Chen',
    skill: bookingData?.skill || 'JavaScript',
    avatar: '',
    rating: 4.9,
    reviews: 247,
    responseTime: '2 hours',
    rate: 25,
    bio: 'Expert JavaScript developer with 8+ years of experience teaching modern web development.'
  };

  const availableSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '7:00 PM'
  ];

  const durations = [
    { value: '30', label: '30 minutes', credits: Math.round(teacher.rate * 0.5) },
    { value: '60', label: '1 hour', credits: teacher.rate },
    { value: '90', label: '1.5 hours', credits: Math.round(teacher.rate * 1.5) },
    { value: '120', label: '2 hours', credits: teacher.rate * 2 }
  ];

  const selectedDuration = durations.find(d => d.value === duration);
  const totalCredits = selectedDuration?.credits || teacher.rate;

  const handleBooking = () => {
    console.log('Booking:', { selectedDate, selectedTime, duration, location, specialRequests });
    onNavigate('dashboard');
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Book a Session</h1>
            <p className="text-sm text-gray-500 mt-1">Schedule a learning session with {teacher.name}</p>
          </div>
          <Button variant="outline" onClick={() => onNavigate('marketplace')}>
            Cancel
          </Button>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Teacher Info */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {teacher.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold">{teacher.name}</h3>
                        <Badge variant="secondary">{teacher.skill}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{teacher.rating}</span>
                          <span>({teacher.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>Responds in {teacher.responseTime}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{teacher.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    Select Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-3 block">Choose a Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </div>
                    <div>
                      <Label className="mb-3 block">Available Time Slots</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                              selectedTime === slot
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Duration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Session Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={duration} onValueChange={setDuration}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {durations.map((d) => (
                        <div key={d.value}>
                          <RadioGroupItem
                            value={d.value}
                            id={d.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={d.value}
                            className="flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 hover:bg-gray-50"
                          >
                            <span className="font-medium">{d.label}</span>
                            <span className="text-sm text-gray-600">{d.credits} credits</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Location Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={location} onValueChange={setLocation}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <RadioGroupItem
                          value="virtual"
                          id="virtual"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="virtual"
                          className="flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 hover:bg-gray-50"
                        >
                          <Video className="w-8 h-8 mb-2 text-blue-600" />
                          <span className="font-medium">Virtual Session</span>
                          <span className="text-sm text-gray-500 text-center mt-1">
                            Video call via platform
                          </span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="in-person"
                          id="in-person"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="in-person"
                          className="flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 hover:bg-gray-50"
                        >
                          <MapPin className="w-8 h-8 mb-2 text-blue-600" />
                          <span className="font-medium">In Person</span>
                          <span className="text-sm text-gray-500 text-center mt-1">
                            Meet at agreed location
                          </span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Special Requests */}
              <Card>
                <CardHeader>
                  <CardTitle>Special Requests (Optional)</CardTitle>
                  <CardDescription>
                    Share any specific topics you'd like to focus on or questions you have
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="e.g., I'd like to focus on React hooks and state management..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="space-y-6 lg:col-span-1">
              <Card className="lg:sticky lg:top-6">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Teacher</span>
                      <span className="font-medium">{teacher.name}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Skill</span>
                      <span className="font-medium">{teacher.skill}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">
                        {selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time</span>
                      <span className="font-medium">{selectedTime || 'Not selected'}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{selectedDuration?.label}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium capitalize">{location === 'virtual' ? 'Video Call' : 'In Person'}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hourly Rate</span>
                      <span className="text-sm">{teacher.rate} credits</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Total Cost</span>
                      <div className="flex items-center gap-1">
                        <Coins className="w-5 h-5 text-amber-600" />
                        <span>{totalCredits} credits</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
                    <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                      <p className="font-medium mb-1">Cancellation Policy</p>
                      <p className="text-xs">Free cancellation up to 24 hours before the session starts.</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
