import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { 
  ArrowLeft, 
  Send, 
  Users, 
  MessageCircle, 
  Clock,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Filter,
  Heart,
  Share2,
  Reply
} from "lucide-react";
import AppLogo from "@/components/AppLogo";

interface CommunityPost {
  id: string;
  farmerName: string;
  timestamp: Date;
  message: string;
  type: 'update' | 'alert' | 'tip' | 'question';
  likes: number;
  comments: number;
}

const Community = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [postType, setPostType] = useState<string>("update");

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    const samplePosts: CommunityPost[] = [
      {
        id: "1",
        farmerName: "Rajesh Kumar",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        message: "Just harvested my wheat crop! Yield was 15% higher than last year thanks to the AI recommendations for fertilizer timing. Highly recommend the soil analysis feature!",
        type: 'update',
        likes: 12,
        comments: 3
      },
      {
        id: "2",
        farmerName: "Priya Sharma",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        message: "⚠️ ALERT: Found early blight symptoms in my tomato plants. Used the disease detection feature and got immediate treatment recommendations. Sharing to help other farmers in the area!",
        type: 'alert',
        likes: 8,
        comments: 5
      },
      {
        id: "3",
        farmerName: "Amit Patel",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        message: "💡 TIP: For better irrigation efficiency, water early morning (5-7 AM) when soil temperature is cooler. This reduces evaporation and helps plants absorb water better.",
        type: 'tip',
        likes: 15,
        comments: 2
      },
      {
        id: "4",
        farmerName: "Sunita Devi",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        message: "Question: Has anyone tried intercropping with legumes? I'm planning to plant chickpeas between my wheat rows. Any advice on spacing and timing?",
        type: 'question',
        likes: 6,
        comments: 7
      }
    ];
    setPosts(samplePosts);
  }, []);

  const handlePost = () => {
    if (newPost.trim()) {
      const post: CommunityPost = {
        id: Date.now().toString(),
        farmerName: "You", // In real app, get from user context
        timestamp: new Date(),
        message: newPost.trim(),
        type: postType as 'update' | 'alert' | 'tip' | 'question',
        likes: 0,
        comments: 0
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setPostType("update");
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const filteredPosts = selectedType === "all" 
    ? posts 
    : posts.filter(post => post.type === selectedType);

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'tip':
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'question':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'alert':
        return t('alert');
      case 'tip':
        return t('tip');
      case 'question':
        return t('question');
      default:
        return t('update');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return t('just_now');
    } else if (diffInHours < 24) {
      return `${diffInHours}h ${t('ago')}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ${t('ago')}`;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9]">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('back_to_dashboard')}
            </Button>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-[#2E7D32]" />
              <h1 className="text-2xl font-bold text-[#2E7D32]">{t('community')}</h1>
            </div>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Post Creation Card */}
        <Card className="mb-6 shadow-md border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#2E7D32]" />
              {t('share_update')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Select value={postType} onValueChange={setPostType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="update">{t('update')}</SelectItem>
                    <SelectItem value="alert">{t('alert')}</SelectItem>
                    <SelectItem value="tip">{t('tip')}</SelectItem>
                    <SelectItem value="question">{t('question')}</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  {getPostIcon(postType)}
                  <span className="text-sm text-gray-600">{getPostTypeLabel(postType)}</span>
                </div>
              </div>
              <Textarea
                placeholder={t('share_placeholder')}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] resize-none border-gray-200 focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {newPost.length}/500 {t('characters')}
                </span>
                <Button
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                  className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {t('post')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t('community_feed')}</h2>
            <div className="flex items-center gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('all_posts')}</SelectItem>
                  <SelectItem value="update">{t('updates')}</SelectItem>
                  <SelectItem value="alert">{t('alerts')}</SelectItem>
                  <SelectItem value="tip">{t('tips')}</SelectItem>
                  <SelectItem value="question">{t('questions')}</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="bg-[#2E7D32]/10 text-[#2E7D32]">
                {filteredPosts.length} {t('posts')}
              </Badge>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <Card className="text-center py-12 shadow-md border-0 bg-white">
              <CardContent>
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {selectedType === "all" ? t('no_posts_yet') : t('no_posts_of_type')}
                </h3>
                <p className="text-gray-500">
                  {selectedType === "all" ? t('be_first_to_post') : t('try_different_filter')}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-[#2E7D32]/10">
                        <AvatarFallback className="text-[#2E7D32] font-semibold">
                          {getInitials(post.farmerName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-800">{post.farmerName}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(post.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPostIcon(post.type)}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          post.type === 'alert' ? 'border-red-200 text-red-600' :
                          post.type === 'tip' ? 'border-yellow-200 text-yellow-600' :
                          post.type === 'question' ? 'border-blue-200 text-blue-600' :
                          'border-green-200 text-green-600'
                        }`}
                      >
                        {getPostTypeLabel(post.type)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 leading-relaxed mb-4">{post.message}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-3 text-gray-500 hover:text-red-500"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-gray-500 hover:text-[#2E7D32]">
                      <Reply className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-gray-500 hover:text-[#2E7D32]">
                      <Share2 className="h-4 w-4 mr-1" />
                      {t('share')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
