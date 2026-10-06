<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUsersSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Super Administrator',
                'email' => 'admin@ayurpravah.org',
                'role' => 'Super Admin',
            ],
            [
                'name' => 'Content Editor',
                'email' => 'editor@ayurpravah.org',
                'role' => 'Content Editor',
            ],
            [
                'name' => 'Finance Officer',
                'email' => 'finance@ayurpravah.org',
                'role' => 'Finance',
            ],
            [
                'name' => 'Registration Desk',
                'email' => 'regdesk@ayurpravah.org',
                'role' => 'Registration Desk',
            ],
            [
                'name' => 'Check-in Staff',
                'email' => 'checkin@ayurpravah.org',
                'role' => 'Check-in Staff',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate([
                'email' => $userData['email'],
            ], [
                'name' => $userData['name'],
                'password' => Hash::make('password'),
            ]);

            $user->syncRoles([$userData['role']]);
        }
    }
}
