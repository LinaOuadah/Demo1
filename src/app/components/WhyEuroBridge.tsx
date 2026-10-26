import { GraduationCap, Briefcase, Building2, Clock, Users, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function WhyEuroBridge() {
  const features = [
    {
      icon: GraduationCap,
      title: "For Students",
      description: "Language courses for learners with different goals and experience levels, as listed in the current course catalogue.",
      benefits: ["Beginner options", "Prerequisites listed", "Multiple study formats", "Course schedules listed"]
    },
    {
      icon: Briefcase,
      title: "For Professionals",
      description: "Courses focused on workplace communication, including the listed Business German and English for Professionals programmes.",
      benefits: ["Business German", "Professional English", "Course objectives listed", "Session times listed"]
    },
    {
      icon: Building2,
      title: "Learning Formats",
      description: "The current course catalogue lists online, in-person, and combined learning formats.",
      benefits: ["Online courses", "In-person courses", "Combined formats", "Format listed per course"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose EuroBridge?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer specialized language learning solutions tailored to your unique needs, 
            Whether you are learning for study, work, or personal development.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
                <CardContent className="p-8">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Listed Course Schedules</h4>
            <p className="text-gray-600 text-sm">Review the days and times shown for each course</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Expert Instructors</h4>
            <p className="text-gray-600 text-sm">Review instructor profiles and listed qualifications</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Course Objectives</h4>
            <p className="text-gray-600 text-sm">See listed learning objectives and prerequisites</p>
          </div>
        </div>
      </div>
    </section>
  );
}