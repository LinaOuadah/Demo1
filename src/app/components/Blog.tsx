import { Card, CardContent } from "./ui/card";
import { Calendar, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Language Learning Success",
      excerpt: "Discover proven strategies that will accelerate your language learning journey and help you achieve fluency faster than ever before.",
      image: "https://images.unsplash.com/photo-1673515334386-2b24073bb22f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMGxlYXJuaW5nJTIwYmxvZyUyMGFydGljbGV8ZW58MXx8fHwxNzU2OTMxNjI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      author: "Dr. Sarah Johnson",
      date: "Dec 15, 2024",
      category: "Learning Tips"
    },
    {
      id: 2,
      title: "The Benefits of Cultural Immersion in Language Learning",
      excerpt: "Explore how understanding culture enhances language acquisition and opens doors to deeper international connections.",
      image: "https://images.unsplash.com/photo-1724018305000-616597f21304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGV4Y2hhbmdlJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzU2ODIzMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      author: "Prof. Maria Garcia",
      date: "Dec 10, 2024",
      category: "Culture"
    },
    {
      id: 3,
      title: "Corporate Language Training: ROI and Business Impact",
      excerpt: "Learn how multilingual teams drive business growth and why investing in corporate language training pays dividends.",
      image: "https://images.unsplash.com/photo-1673515334717-da4d85aaf38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxhbmd1YWdlJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzU2OTMxNjMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      author: "James Ochieng",
      date: "Dec 5, 2024",
      category: "Business"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sample article previews for demonstration only. Article pages are not available.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}