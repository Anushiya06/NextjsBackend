import connectDB from "@/lib/db";
import User from "@/models/productModel";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const id = params.id;
    
    const user = await User.findById(id);
    if (!user) {
      return Response.json(
        {
          status: "error",
          message: "User not found"
        }, 
        { status: 404 }
      );
    }
    
    return Response.json({
      status: "success",
      message: "User fetched successfully",
      data: user
    }, { status: 200 });
  } catch (error) {
    return Response.json({
      status: "error",
      error: error.message
    }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const id = params.id;
    
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return Response.json(
        {
          status: "error",
          message: "User not found"
        }, 
        { status: 404 }
      );
    }
    
    return Response.json({
      status: "success",
      message: "User deleted successfully"
    }, { status: 200 });
  } catch (error) {
    return Response.json({
      status: "error",
      message: "Something went wrong: " + error.message
    }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const id = params.id;
    const data = await req.json();
    
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      data, 
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return Response.json(
        {
          status: "error",
          message: "User not found"
        }, 
        { status: 404 }
      );
    }
    
    return Response.json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser
    }, { status: 200 });
  } catch (error) {
    return Response.json({
      status: "error",
      message: "Something went wrong: " + error.message
    }, { status: 500 });
  }
}
