import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Dropdown() {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-black text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] 
      transition-shadow duration-300 
      hover:shadow-[0_0_40px_rgba(139,92,246,1)]">
      <CardHeader className="text-center md:text-xl">
        <CardTitle>Select your Branch & Semester</CardTitle>
        {/* <CardDescription>Get Started in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework" className=" md:text-lg">Select Branch</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-black text-white">
                  <SelectItem value="cse">CSE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework" className=" md:text-lg">Select Semester</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-black text-white">
                  <SelectItem value="sem1">Semester 1</SelectItem>
                  <SelectItem value="sem2">Semester 2</SelectItem>
                  <SelectItem value="sem3">Semester 3</SelectItem>
                  <SelectItem value="sem4">Semester 4</SelectItem>
                  <SelectItem value="sem5">Semester 5</SelectItem>
                  <SelectItem value="sem6">Semester 6</SelectItem>
                  <SelectItem value="sem7">Semester 7</SelectItem>
                  <SelectItem value="sem8">Semester 8</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="bg-purple-800">Get Started!</Button>
      </CardFooter>
    </Card>
    </div>
  )
}
