import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, X } from 'lucide-react';

interface SkillsSelectionProps {
  userData: any;
  onComplete: (skillsData: any) => void;
  onNavigate: (screen: string) => void;
}

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  category: string;
}

export function SkillsSelection({ userData, onComplete, onNavigate }: SkillsSelectionProps) {
  const [teachSkills, setTeachSkills] = useState<Skill[]>([]);
  const [learnSkills, setLearnSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<{ name: string; level: 'beginner' | 'intermediate' | 'expert'; category: string }>({ name: '', level: 'beginner', category: '' });
  const [customSkill, setCustomSkill] = useState('');

  // const skillCategories = [
  //   'Programming', 'Design', 'Languages', 'Music', 'Sports', 'Cooking',
  //   'Photography', 'Writing', 'Marketing', 'Finance', 'Art', 'Crafts'
  // ];

  const popularSkills = [
    { name: 'JavaScript', category: 'Programming' },
    { name: 'Python', category: 'Programming' },
    { name: 'UI/UX Design', category: 'Design' },
    { name: 'Spanish', category: 'Languages' },
    { name: 'Guitar', category: 'Music' },
    { name: 'Photography', category: 'Photography' },
    { name: 'Cooking', category: 'Cooking' },
    { name: 'Yoga', category: 'Sports' },
    { name: 'Drawing', category: 'Art' },
    { name: 'Writing', category: 'Writing' }
  ];

  const addSkill = (skillList: Skill[], setSkillList: Function, skillName: string, category: string) => {
    if (skillList.some(skill => skill.name === skillName)) return;
    
    const newSkillObj: Skill = {
      name: skillName,
      level: newSkill.level,
      category: category || 'Other'
    };
    setSkillList([...skillList, newSkillObj]);
  };

  const removeSkill = (skillList: Skill[], setSkillList: Function, skillName: string) => {
    setSkillList(skillList.filter(skill => skill.name !== skillName));
  };

  const handleComplete = () => {
    onComplete({
      ...userData,
      skills: {
        teach: teachSkills,
        learn: learnSkills
      }
    });
  };

  const renderSkillSection = (
    title: string,
    description: string,
    skills: Skill[],
    setSkills: Function,
    tabValue: string
  ) => (
    <div className="space-y-4">
      <div>
        <h3 className="text-base sm:text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {/* Current Skills */}
      <div className="space-y-2">
        <Label>Selected Skills</Label>
        <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
          {skills.length === 0 ? (
            <span className="text-muted-foreground text-sm">No skills selected yet</span>
          ) : (
            skills.map((skill) => (
              <Badge key={skill.name} variant="secondary" className="flex items-center gap-1 text-xs bg-neutral-200 text-black">
                {skill.name} ({skill.level})
                <X 
                  className="w-3 h-3 cursor-pointer clickable text-black"
                  onClick={() => removeSkill(skills, setSkills, skill.name)}
                />
              </Badge>
            ))
          )}
        </div>
      </div>

      {/* Add Popular Skills */}
      <div className="space-y-2">
        <Label>Popular Skills</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {popularSkills.map((skill) => (
            <Button
              key={skill.name}
              variant="outline"
              size="sm"
              onClick={() => addSkill(skills, setSkills, skill.name, skill.category)}
              disabled={skills.some(s => s.name === skill.name)}
              className="justify-start text-xs sm:text-sm "
            >
              <Plus className="w-3 h-3 mr-1" />
              {skill.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Skill Input */}
      <div className="space-y-2">
        <Label>Add Custom Skill</Label>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Enter skill name"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            className="flex-1 bg-neutral-200"
          />
          <Select value={newSkill.level} onValueChange={(value: 'beginner' | 'intermediate' | 'expert') => 
            setNewSkill(prev => ({ ...prev, level: value }))
          }>
            <SelectTrigger className="w-full sm:w-32 bg-neutral-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="beginner" className="hover:bg-neutral-100 hover:text-black">Beginner</SelectItem>
              <SelectItem value="intermediate" className="hover:bg-neutral-100 hover:text-black">Intermediate</SelectItem>
              <SelectItem value="expert" className="hover:bg-neutral-100 hover:text-black">Expert</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              if (customSkill.trim()) {
                addSkill(skills, setSkills, customSkill.trim(), 'Custom');
                setCustomSkill('');
              }
            }}
            disabled={!customSkill.trim()}
            className={`w-full sm:w-auto text-white ${customSkill.trim() ? 'bg-black' : 'bg-zinc-800'}`}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm sm:max-w-4xl bg-white">
        <CardHeader className="text-center px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">Choose Your Skills</CardTitle>
          <CardDescription className="text-sm">Tell us what you can teach and what you'd like to learn</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 ">
          <Tabs defaultValue="teach" className="w-full ">
            <TabsList className="grid w-full grid-cols-2 bg-neutral-200 rounded-full">
              <TabsTrigger value="teach" className="text-sm h-7 rounded-full data-[state=active]:bg-white data-[state=active]:text-black">Skills I Can Teach</TabsTrigger>
              <TabsTrigger value="learn" className="text-sm h-7 rounded-full data-[state=active]:bg-white data-[state=active]:text-black">Skills I Want to Learn</TabsTrigger>
            </TabsList>
            
            <TabsContent value="teach" className="space-y-4 mt-4">
              {renderSkillSection(
                "What can you teach?",
                "Share your expertise and help others learn",
                teachSkills,
                setTeachSkills,
                "teach"
              )}
            </TabsContent>
            
            <TabsContent value="learn" className="space-y-4 mt-4">
              {renderSkillSection(
                "What would you like to learn?",
                "Discover new skills from talented teachers",
                learnSkills,
                setLearnSkills,
                "learn"
              )}
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => onNavigate('profile')}>
              Back
            </Button>
            <Button onClick={handleComplete} className="w-full sm:w-auto bg-black text-white">
              Complete Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}