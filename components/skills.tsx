'use client';

import { useState } from 'react';
import { Cpu, Code, Database, Palette, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { getSkillsByCategory } from '@infrastructure';
import { SKILL_LEVELS } from '@constants';
import type { Skill, SkillCategory } from '@app-types';

const skillCategoryIcons = {
  frontend: Code,
  backend: Database,
  tools: Wrench,
  design: Palette,
  other: Cpu,
};

const skillCategories = [
  { value: 'all', label: 'All Skills' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'tools', label: 'Tools' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' },
];

export async function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');

  const skills = await getSkillsByCategory(selectedCategory);

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Skills
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value as SkillCategory)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const IconComponent = skillCategoryIcons[skill.category as keyof typeof skillCategoryIcons] || Cpu;
            const levelConfig = SKILL_LEVELS[skill.level];

            return (
              <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <IconComponent className="w-5 h-5 text-gray-700" />
                      </div>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Proficiency</span>
                      <span className="text-sm font-medium">{levelConfig.label}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${levelConfig.color}`}
                        style={{
                          width: `${getSkillPercentage(skill.level)}%`
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getSkillPercentage(level: string): number {
  switch (level) {
    case 'beginner':
      return 25;
    case 'intermediate':
      return 50;
    case 'advanced':
      return 75;
    case 'expert':
      return 100;
    default:
      return 0;
  }
}
