<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
Auth::routes();
Route::get('/', function () {
    return view('welcome');
});
Route::get('chat',[ChatController::class,'chat']);
Route::post('send',[ChatController::class,'send']);
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');