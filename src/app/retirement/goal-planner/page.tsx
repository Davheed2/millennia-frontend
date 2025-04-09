"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function RetirementGoalPlanner() {
  const [goals, setGoals] = useState<
    {
      id: number;
      name: string;
      target: number;
      current: number;
      priority: string;
    }[]
  >([]);

  const [newGoal, setNewGoal] = useState({
    name: "",
    target: 10000,
    current: 0,
    priority: "Medium",
  });

  interface Goal {
    id: number;
    name: string;
    target: number;
    current: number;
    priority: string;
  }

  interface NewGoal {
    name: string;
    target: number;
    current: number;
    priority: string;
  }

  const handleAddGoal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newGoal.name) {
      setGoals([...goals, { id: Date.now(), ...newGoal } as Goal]);
      setNewGoal({
        name: "",
        target: 10000,
        current: 0,
        priority: "Medium",
      } as NewGoal);
    }
  };

  const calculateProgress = (current: number, target: number): number => {
    return Math.min(100, Math.round((current / target) * 100));
  };

  interface PriorityClassMap {
    [key: string]: string;
  }

  const getPriorityClass = (priority: string): string => {
    const priorityClassMap: PriorityClassMap = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    };

    return priorityClassMap[priority] || "bg-blue-100 text-blue-800";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-invest/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Target className="h-10 w-10 text-invest" />
            </div>
            <h1 className="heading-xl mb-6">Retirement Goal Planner</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Set clear financial goals for your retirement journey. Track your
              progress and stay motivated as you work towards a secure financial
              future.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-invest/5 border-none">
              <CardHeader className="text-center">
                <div className="bg-invest/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Target className="h-6 w-6 text-invest" />
                </div>
                <CardTitle className="text-xl">Set Goals</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Define your retirement goals with clear targets and timelines.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-invest/5 border-none">
              <CardHeader className="text-center">
                <div className="bg-invest/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-6 w-6 text-invest" />
                </div>
                <CardTitle className="text-xl">Track Progress</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Monitor your achievements and see how close you are to your
                  retirement goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-invest/5 border-none">
              <CardHeader className="text-center">
                <div className="bg-invest/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-6 w-6 text-invest" />
                </div>
                <CardTitle className="text-xl">Achieve Success</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Celebrate milestones and adjust your strategy as you move
                  toward retirement.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="h-5 w-5 text-invest" />
                  Add a New Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddGoal} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goalName">Goal Name</Label>
                    <Input
                      id="goalName"
                      placeholder="e.g., Vacation Home"
                      value={newGoal.name}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">
                      Target Amount: ${newGoal.target.toLocaleString()}
                    </Label>
                    <Slider
                      id="targetAmount"
                      min={1000}
                      max={2000000}
                      step={1000}
                      value={[newGoal.target]}
                      onValueChange={(value) =>
                        setNewGoal({ ...newGoal, target: value[0] })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentAmount">
                      Current Savings: ${newGoal.current.toLocaleString()}
                    </Label>
                    <Slider
                      id="currentAmount"
                      min={0}
                      max={newGoal.target}
                      step={100}
                      value={[newGoal.current]}
                      onValueChange={(value) =>
                        setNewGoal({ ...newGoal, current: value[0] })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newGoal.priority}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, priority: e.target.value })
                      }
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-invest hover:bg-invest-secondary"
                  >
                    Add Goal
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-invest" />
                  Your Retirement Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{goal.name}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(
                            goal.priority
                          )}`}
                        >
                          {goal.priority} Priority
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>Current: ${goal.current.toLocaleString()}</span>
                        <span>Target: ${goal.target.toLocaleString()}</span>
                      </div>
                      <div className="mb-1">
                        <Progress
                          value={calculateProgress(goal.current, goal.target)}
                          className="h-2"
                        />
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          ${(goal.target - goal.current).toLocaleString()}{" "}
                          remaining
                        </span>
                        <span className="font-semibold">
                          {calculateProgress(goal.current, goal.target)}%
                          complete
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-invest/5 p-8 rounded-xl">
            <h2 className="heading-md text-center mb-6">
              Need Help Setting Goals?
            </h2>
            <p className="text-center mb-6 max-w-2xl mx-auto">
              Our financial advisors can help you establish realistic retirement
              goals and create a personalized plan to achieve them.
            </p>
            <div className="flex justify-center">
              <Link href="/contact">
                <Button className="bg-invest hover:bg-invest-secondary text-white">
                  Consult Customer Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
