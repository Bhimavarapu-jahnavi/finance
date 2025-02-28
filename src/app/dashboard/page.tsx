'use client'
import { Shield, FileText, TrendingUp, CreditCard, 
         Coins, Briefcase, Bot, FileSearch } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LucideIcon } from 'lucide-react';
import { Suspense } from 'react'
import { DashboardSkeleton } from '@/components/skeletons/DashboardSkeleton'

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <Icon className="w-8 h-8 mb-2 text-primary" />
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
);

const Dashboard = () => {
  const features = [
    {
      icon: Shield,
      title: 'Fraud Detection',
      description: 'Advanced AI-powered system to detect and prevent fraudulent activities'
    },
    {
      icon: FileText,
      title: 'Automated Reporting',
      description: 'Generate comprehensive financial reports automatically'
    },
    {
      icon: TrendingUp,
      title: 'Stock Market Prediction',
      description: 'AI-driven market analysis and prediction tools'
    },
    {
      icon: CreditCard,
      title: 'Credit Risk Assessment',
      description: 'Evaluate and manage credit risks effectively'
    },
    {
      icon: Coins,
      title: 'Cryptocurrency Prediction',
      description: 'Real-time crypto market analysis and forecasting'
    },
    {
      icon: Briefcase,
      title: 'Portfolio Management',
      description: 'Personalized investment portfolio optimization'
    },
    {
      icon: Bot,
      title: 'AI Financial Advisor',
      description: '24/7 AI-powered financial advisory chatbot'
    },
    {
      icon: FileSearch,
      title: 'Legal Document Summary',
      description: 'Quick and accurate legal document analysis'
    },
  ];

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Welcome to Your FinHub
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  )
}