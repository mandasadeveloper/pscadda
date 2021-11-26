<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class Test extends Controller
{
        function Test(){ 
            $data = DB::table('test')->get();
            return response()->json([
            'status'  => 200,
            'data' => $data,
            ]);
     }
     function TestListGet($id){ 
        $data = DB::table('test_list')->where("test_id",$id)->get();
        return response()->json([
        'status'  => 200,
        'data' => $data,
        ]);
 }
     
     function CreatTest(Request $request){  
        $cardname=$request->input('cardname');         
        $description=$request->input('description');               
        $all=array('cardname'=>$cardname,'description'=>$description);                 
       $test = DB::table('test')->insertGetId($all);
        return response()->json([
            'status'  => 200,
            'message' => $test,
        ]);        
        }

        function InsertTestList(Request $request){  
            $test_id=$request->input('test_id');         
            $quiz=$request->input('quiz');               
            $all=array('test_id'=>$test_id,'quiz'=>$quiz);                 
           $test = DB::table('test_list')->insertGetId($all);
            return response()->json([
                'status'  => 200,
                'message' => $test,
            ]);        
            }

            function QuizQuction(Request $request){   
                $test_id=$request->input('test_id');                               
                $qustions=$request->input('quiztest');  
                $option_1=$request->input('option_1');
                $option_2=$request->input('option_2');
                $option_3=$request->input('option_3');
                $option_4=$request->input('option_4');       
                $answer=$request->input('answer');       
               $all=array(
               'test_id'=> $test_id,
               'qustions'=> $qustions,
               'option_1'=> $option_1,
               'option_2'=> $option_2,
               'option_3'=> $option_3,
               'option_4'=> $option_4,
               'answer'=> $answer,);                 
               DB::table('test_qustion')->insertGetId($all);
                return response()->json([
                    'status'  => 200,
                    'message' => "succsess",
                ]);        
                }

                function GetQuizQuction($id){ 
                    $data = DB::table('test_qustion')->where("test_id",$id)->get();
                    return response()->json([
                    'status'  => 200,
                    'data' => $data,
                    ]);
                }


                function Report(Request $request){  
                    $user_id=$request->input('user_id');         
                    $user_name=$request->input('user_name');
                    $report=$request->input('report');              
                    $all=array('user_id'=>$user_id,'user_name'=>$user_name, 'answer'=>$report);                 
                   $test = DB::table('users_answer')->insertGetId($all);
                    return response()->json([
                        'status'  => 200,
                        'message' => $test,
                    ]);        
                    }
                    function AnswerSheet($id){ 
                        $data = DB::table('users_answer')->where("id",$id)->get();
                        return response()->json([
                        'status'  => 200,
                        'data' => $data,
                        ]);
                    }
}
