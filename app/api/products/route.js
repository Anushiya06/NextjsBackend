import connectDB from "@/lib/db";
import User from "@/models/productModel";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    return Response.json({ 
      status: "success",
      message: "Users fetched successfully",
      data: users,
      count: users.length
    }, { status: 200 });
  } catch (error) {
    return Response.json({
      status: "error",
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    
    const data = await req.json();
    
    if (!data.name || data.age === undefined) {
      return Response.json({
        status: "error",
        error: "Name and age are required"
      }, { status: 400 });
    }
    
    const newUser = await User.create({
      name: data.name,
      age: data.age
    });
    
    return Response.json({
      status: "success",
      message: "User created successfully",
      data: newUser
    }, { status: 201 });
  } catch (error) {
    return Response.json({
      status: "error",
      error: error.message
    }, { status: 500 });
  }
}

export async function HEAD() {
  try {
    await connectDB();
    return new Response(null, { 
      status: 200,
      headers: { 'X-DB-Connection': 'Success' }
    });
  } catch (error) {
    return new Response(null, { 
      status: 500,
      headers: { 'X-DB-Connection': 'Failed' }
    });
  }
}
