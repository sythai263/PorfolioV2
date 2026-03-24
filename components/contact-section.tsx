"use client";

import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form:", formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-t2 text-foreground">Get in touch</h2>
            <p className="text-b16-reg text-neutral-04">
              I'm always interested in hearing about new opportunities and
              exciting projects. Feel free to reach out if you'd like to
              collaborate or just have a chat!
            </p>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-b16-reg text-foreground">
                  lesy.thai@example.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-b16-reg text-foreground">
                  +84 123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-b16-reg text-foreground">
                  Ho Chi Minh City, Vietnam
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 bg-neutral-09 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-neutral-09 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-neutral-09 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-custom input-md"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input-custom input-md"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="input-custom input-md"
                />
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="input-custom input-md resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-custom btn-l bg-primary text-white w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
