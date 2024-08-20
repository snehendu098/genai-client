import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
      <Card className="mx-auto w-[50%] max-w-xl bg-muted">
        <CardHeader>
          <CardTitle>Create a Single Supplier</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <Label>Username</Label>
            {/* TODO: Value updation */}
            <Input
              className="mb-6 mt-2"
              id="usernmae"
              placeholder="john123"
              required
            />
            <Label>Identifier</Label>
            <Input
              id="identifier"
              className="mb-6 mt-2"
              placeholder="john 1"
              required
            />
            <Label>Password</Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              required
              className="mb-6 mt-2"
            />
            <div className="w-full grid grid-cols-2 gap-6">
              <Button className="w-full">Create Supplier</Button>
              <Button variant={"outline"}>Create Group</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
