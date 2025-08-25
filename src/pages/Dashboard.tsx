import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import CallModal from "@/components/CallModal";
import { Phone, Video, Users, ArrowRightLeft, ChevronDown, ExternalLink } from "lucide-react";

const Dashboard = () => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Thanks for using Dialpad Demo",
    });
    navigate("/");
  };

  const recentActivity = [
    {
      type: "call",
      contact: "Admin One",
      number: "(902) 401-5096",
      time: "11:43 AM",
      icon: "A",
      color: "bg-purple-500"
    },
    {
      type: "call",
      contact: "Kitchener Lab 01",
      number: "(902) 401-...",
      time: "Jul 30, 2025",
      icon: "#",
      color: "bg-pink-500"
    },
    {
      type: "call",
      contact: "Admin One",
      number: "+1 234-567-1000",
      time: "Jul 25, 2025",
      icon: "A",
      color: "bg-purple-500"
    },
    {
      type: "call",
      contact: "Kitchener Lab 01",
      number: "+1 234-56...",
      time: "Jul 25, 2025",
      icon: "#",
      color: "bg-orange-500"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="text-sm">
                <Users className="w-4 h-4 mr-2" />
                Invite Your Team
              </Button>
              <div className="flex items-center space-x-2">
                <input 
                  placeholder="Search Help Center" 
                  className="px-3 py-2 border rounded-lg text-sm w-48"
                />
              </div>
              <Button variant="ghost" onClick={handleLogout} className="text-sm">
                Log Out
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card 
                className="p-6 cursor-pointer hover:shadow-md transition-shadow group"
                onClick={() => setIsCallModalOpen(true)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                      <Phone className="w-4 h-4 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Make a call</h3>
                    <p className="text-sm text-gray-600">Open the Dialpad App.</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                </div>
              </Card>

              <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                      <Video className="w-4 h-4 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Start a meeting</h3>
                    <p className="text-sm text-gray-600">Host a video conference.</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                </div>
              </Card>

              <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Invite users</h3>
                    <p className="text-sm text-gray-600">Add your team to Dialpad.</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                </div>
              </Card>

              <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                      <ArrowRightLeft className="w-4 h-4 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Transfer your number</h3>
                    <p className="text-sm text-gray-600">Bring your number to Dialpad.</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                </div>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Account Summary */}
              <div className="lg:col-span-1">
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="text-lg">Your account summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-purple-600 rounded-sm"></div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Plan:</span>
                        <span className="ml-2 text-purple-600 font-medium">Enterprise</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-600">Role:</span>
                        <span className="ml-2 text-purple-600 font-medium">Admin</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">Personal meeting link:</span>
                      </div>
                      <a href="#" className="text-sm text-purple-600 hover:underline block ml-8">
                        https://meetings.dialpadbeta.com/admin-one
                      </a>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold text-gray-900 mb-2">Your Caller ID</h4>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Your direct number: Ext 00005</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Center Image */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <img 
                    src="/lovable-uploads/7c8d9673-3316-4eab-897b-027212a960a4.png"
                    alt="Woman working on laptop" 
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-1">
                <Card className="h-fit">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Your recent activity</CardTitle>
                    <Button variant="ghost" className="text-sm text-purple-600 hover:text-purple-700">
                      View all
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                              {activity.icon}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{activity.contact}, {activity.number}</p>
                              <p className="text-sm text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Setup Section */}
            <div className="mt-8">
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Let's get you set up!</h3>
                      <p className="text-gray-600 mb-4">Follow these quick steps to get up and running.</p>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
                          <div className="w-2 h-2 bg-purple-600 rounded-sm"></div>
                        </div>
                        <span className="font-medium">0% Completed</span>
                      </div>
                    </div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div className="w-0 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>

        <CallModal open={isCallModalOpen} onOpenChange={setIsCallModalOpen} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;