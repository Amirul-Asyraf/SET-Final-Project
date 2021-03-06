<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Contacts;
use Validator;
use File;
use Auth;
use Illuminate\Routing\UrlGenerator;

class ContactController extends Controller
{
    //
    protected $contacts;
    protected $base_url;

    public function __construct(UrlGenerator $urlGenerator)
    {
        $this->middleware("auth:users");
        $this->contacts = new Contacts;
        $this->base_url = $urlGenerator->to("/");
    }

    //this function/end-point is to create a new contact specific to user
    public function addContacts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "token"=>"required",
            "firstname"=>"required|string",
            "phonenumber"=>"required|string"

        ]);

        if($validator->fails())
        {
            return response()->json([
                "success"=>false,
                "message"=>$validator->messages()->toArray()
            ], 500);
        }

        $profile_picture = $request->profile_image;
        $file_name = "";

        if($profile_picture==null || $profile_picture=="") {
            $file_name = "default-avatar.png";
        } else {
            $generate_name = uniqid()."_".time().date("Ymd")."_IMG";
            $base64Image = $profile_picture;
            $fileBin = file_get_contents($base64Image);
            $mimetype = mime_content_type($base64Image);

            if("image/png"==$mimetype)
            {
                $file_name = $generate_name.".png";
            }
            else if("image/jpeg"==$mimetype)
            {
                $file_name = $generate_name.".jpeg";
            }
            else if("image/jpg"==$mimetype)
            {
                $file_name = $generate_name.".jpg";
            }
            else {
                return response()->json([
                    "success"=>false,
                    "message"=>"only png, jpg, and jpeg files are accepted for setting profile pictures"
                ], 500);
            }
        }

        /**
        * get and set country code if it does or doesnt exist
        */
        $country_code = "";
        if($request->country_code=="" || $request->country_code==null)
        {
         $country_code = "";
        }else
        {
            $country_code = $request->country_code;
        }

        $user_token = $request->token;
        $user = auth("users")->authenticate($user_token);
        $user_id = $user->id;

        $this->contacts->user_id = $user_id;
        $this->contacts->phonenumber = $request->phonenumber;
        $this->contacts->firstname = $request->firstname;
        $this->contacts->lastname = $request->lastname;
        $this->contacts->email = $request->email;
        $this->contacts->country_code = $country_code;
        $this->contacts->image_file = $file_name;
        $this->contacts->save();

        if($profile_picture == null)
        {

        } else {
            file_put_contents("./profile_images/".$file_name,$fileBin);
        }

        return response()->json([
            "success"=>true,
            "messages"=>"Contact saved successfully"
        ], 200);
    }

    //getting contacts specific to a particular user
    public function getPaginatedData($token, $pagination=null)
    {
        $file_directory = $this->base_url."/profile_images";
        $user = auth("users")->authenticate($token);
        $user_id = $user->id;
        if($pagination == null || $pagination=="")
        {
            $contacts = $this->contacts->where("user_id", $user_id)->orderBy("id", "DESC")->get()->toArray();
            return response()->json([
                "success"=>true,
                "data"=>$contacts,
                "file_directory"=>$file_directory
            ], 200);
        }

        $contacts_paginated = $this->contacts->where("user_id", $user_id)->orderBy("id", "DESC")->paginate($pagination);
        return response()->json([
            "success"=>true,
            "data"=>$contacts_paginated,
            "file_directory"=>$file_directory
        ], 200);
    }

    //update contact function/endpoint
    public function editSingleData(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "firstname"=>"required|string",
            "phonenumber"=>"required|string"
        ]);

        if($validator->fails())
        {
            return response()->json([
                "success"=>false,
                "message"=>$validator->messages()->toArray()
            ], 400);
        }

        $findData = $this->contacts::find($id);
        if(!$findData)
        {
            return response()->json([
                "success"=>false,
                "message"=>"This contact has no valid id."
            ], 400);
        }

        $getFile = $findData->image_file;
        $getFile == "default-avatar.png" ? : File::delete("./profile_images/".$getFile);

        $profile_picture = $request->profile_image;
        // $profile_picture = "";
        $file_name = "";

        if($profile_picture==null || $profile_picture == "") {
            $file_name = "default-avatar.png";
        } else {
            $generate_name = uniqid()."_".time().date("Ymd")."_IMG";
            $base64Image = $profile_picture;
            $fileBin = file_get_contents($base64Image);
            $mimetype = mime_content_type($base64Image);

            if("image/png"==$mimetype)
            {
                $file_name = $generate_name.".png";
            }
            else if("image/jpeg"==$mimetype)
            {
                $file_name = $generate_name.".jpeg";
            }
            else if("image/jpg"==$mimetype)
            {
                $file_name = $generate_name.".jpg";
            }
            else {
                return response()->json([
                    "success"=>false,
                    "message"=>"only png, jpg, and jpeg files are accepted for setting profile pictures"
                ], 500);
            }
        }

        /**
        * get and set country code if it does or doesnt exist
        */
        $country_code = "";
        if($request->country_code=="" || $request->country_code==null)
        {
         $country_code = "";
        }else
        {
            $country_code = $request->country_code;
        }

        $findData->phonenumber = $request->phonenumber;
        $findData->firstname = $request->firstname;
        $findData->lastname = $request->lastname;
        $findData->email = $request->email;
        $findData->country_code = $request->country_code;
        $findData->image_file = $file_name;
        $findData->save();

        if($profile_picture == null)
        {

        } else {
            file_put_contents("./profile_images/".$file_name,$fileBin);
        }

        return response()->json([
            "success"=>true,
            "messages"=>"Contact updated successfully"
        ], 200);
    }

    //deleting contacts endpoint
    public function deleteContacts($id)
    {
        $findData = $this->contacts::find($id);
        if(!$findData)
        {
            return response()->json([
                "success"=>true,
                "messages"=>"Contact with this id doesnt exist."
            ], 500);
        }

        $getFile = $findData->image_file;
        if($findData->delete())
        {
            $getFile == "default-avatar.png" ? : File::delete("./profile_images".$getFile);

            return response()->json([
                "success"=>true,
                "messages"=>"Contact deleted successfully."
            ], 200);
        }
    }

    //endpoint for getting single data
    public function getSingleData($id)
    {
        $file_directory = $this->base_url."/profile_images";
        $findData = $this->contacts::find($id);
        if(!$findData)
        {
            return response()->json([
                "success"=>true,
                "messages"=>"Contact with this id doesnt exist."
            ], 500);
        }

        return response()->json([
            "success"=>true,
            "data"=>$findData,
            "file_directory"=>$file_directory
        ], 200);
    }

    //this function is to search for data and paginating our data searched
    public function searchData($search, $pagination=null)
    {
        $file_directory = $this->base_url."/profile_images";
        // $user = auth('users')->authenticate($token);
        $user_id = Auth::user("users")->id;

        $search = explode('%20', $search);
        $search = implode(" ", $search);

        if($pagination==null || $pagination=="")
        {
            // "SELECT * FROM table WHERE (user_id='user_id) AND (first)"
            $non_paginated_search_query = $this->contacts::where("user_id", $user_id)->
            where(function($query) use ($search){
                $query->where("firstname", "LIKE", "%$search%")->orWhere("lastname", "LIKE", "%$search%")->
                orWhere("email", "LIKE", "%$search%")->orWhere("phonenumber", "LIKE", "%$search%");
            })->orderBy("id", "DESC")->get()->toArray();

            return response()->json([
                "success"=>true,
                "data"=>$non_paginated_search_query,
                "file_directory"=>$file_directory
            ], 200);
        }

        $paginated_search_query = $this->contacts::where("user_id", $user_id)->
        where(function($query) use ($search){
            $query->where("firstname", "LIKE", "%$search%")->orWhere("lastname", "LIKE", "%$search%")->
            orWhere("email", "LIKE", "%$search%")->orWhere("phonenumber", "LIKE", "%$search%");
        })->orderBy("id", "DESC")->paginate($pagination);

        return response()->json([
            "success"=>true,
            "data"=>$paginated_search_query,
            "file_directory"=>$file_directory
        ], 200);
    }

    public function viewStats($token) {
        // $user = auth("users")->authenticate($token);
        // $user_id = $user->id;
        // if($pagination == null || $pagination=="")
        // {
        //     $contacts = $this->contacts->where("user_id", $user_id)->orderBy("id", "DESC")->get()->toArray();
        //     return response()->json([
        //         "success"=>true,
        //         "data"=>$contacts,
        //         "file_directory"=>$file_directory
        //     ], 200);
        // }
    }
}
