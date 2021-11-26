<?php

use App\Http\Controllers\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('test_get',[Test::class,'Test']);
Route::get('test_list_get/{id}',[Test::class,'TestListGet']);
Route :: post('test_post',[Test::class, 'CreatTest']);
Route :: post('test_list_post',[Test::class, 'InsertTestList']);
Route :: post('quiz_test_post',[Test::class, 'QuizQuction']);
Route :: post('users_answer',[Test::class, 'Report']);
Route :: get('quiz_test_get/{id}',[Test::class, 'GetQuizQuction']);
Route :: get('answersheet/{id}',[Test::class, 'AnswerSheet']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 