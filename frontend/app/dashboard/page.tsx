"use client"

import { DashboardLayout } from "@/components/DashboardLayout";
import Link from "next/link";
import { Book, BookOpen, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const breadcrumbItems = [
  { label: "Multilingual Resources", href: "/dashboard" },
];

export default function Page() {
  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Multilingual Resources</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Storytime Card */}
          <Link href="/dashboard/stories">
            <Card className="bg-primary/10 aspect-[4/3] transition cursor-pointer hover:shadow-lg">
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Book className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Storytime</CardTitle>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <Image
                    src="/images/bobba-together.jpeg"
                    alt="Storytime Illustration"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-md max-h-[80%] w-auto"
                  />
                </div>
              </div>
            </Card>
          </Link>

          {/* Activities Card */}
          <Link href="/dashboard/activities">
            <Card className="bg-green-100 aspect-[4/3] transition cursor-pointer hover:shadow-lg">
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-200 rounded-full">
                    <Gamepad2 className="h-10 w-10 text-green-700" />
                  </div>
                  <CardTitle className="text-2xl">Activities</CardTitle>
                </div>
                <h2 className="text-center mt-4 text-sm text-gray-600">
                     </h2>
                <div className="flex-1 flex items-center justify-center">
                  <Image
                    src="/images/bobba-kindergarden.jpeg"
                    alt="Activities Illustration"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-md max-h-[60%] w-auto"
                  />
                </div>
              </div>
            </Card>
          </Link>
        </div>
        
        {/* Pedagogical Guide Button */}
        <div className="flex justify-left mt-8">
          <Link href="/dashboard/guide">
            <Button variant="outline" size="lg"                     className="h-24 text-2xl">
              <BookOpen className="h-5 w-5" />
              Pedagogical Guide
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}