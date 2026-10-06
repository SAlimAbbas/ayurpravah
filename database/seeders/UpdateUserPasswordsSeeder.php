<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UpdateUserPasswordsSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('----------------------------------------------------');
        $this->command->info('Updating User Passwords...');
        $this->command->info('----------------------------------------------------');

        // 1. Super Administrator
        $admin = User::firstOrCreate(
            ['email' => 'admin@ayurpravah.org'],
            ['name' => 'Super Administrator']
        );
        $admin->password = Hash::make('Ayurpravah@2027');
        $admin->save();
        if (!$admin->hasRole('Super Admin')) {
            $admin->syncRoles(['Super Admin']);
        }
        $this->command->info('👤 admin@ayurpravah.org   -> Ayurpravah@2027');

        // 2. Other staff/demo roles with secure random passwords
        $rolesMap = [
            'editor@ayurpravah.org' => ['name' => 'Content Editor', 'role' => 'Content Editor'],
            'finance@ayurpravah.org' => ['name' => 'Finance Officer', 'role' => 'Finance'],
            'regdesk@ayurpravah.org' => ['name' => 'Registration Desk', 'role' => 'Registration Desk'],
            'checkin@ayurpravah.org' => ['name' => 'Check-in Staff', 'role' => 'Check-in Staff'],
        ];

        foreach ($rolesMap as $email => $meta) {
            $user = User::firstOrCreate(
                ['email' => $email],
                ['name' => $meta['name']]
            );
            
            // Generate a secure random password (e.g. Ayur_x8Kp9Q2wZ)
            $randomPassword = 'Ayur_' . Str::password(12, true, true, false);
            $user->password = Hash::make($randomPassword);
            $user->save();
            
            if (!$user->hasRole($meta['role'])) {
                $user->syncRoles([$meta['role']]);
            }

            $this->command->info("👤 {$email} (" . $meta['role'] . ") -> {$randomPassword}");
        }

        $this->command->info('----------------------------------------------------');
        $this->command->info('Passwords updated successfully!');
        $this->command->info('----------------------------------------------------');
    }
}
