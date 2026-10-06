<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Permissions list
        $permissions = [
            // Settings & Users
            'manage-settings',
            'manage-users',
            'view-activity-log',

            // Content & Media
            'manage-pages',
            'manage-hero',
            'manage-speakers',
            'manage-sessions',
            'manage-conclaves',
            'manage-gallery',
            'manage-posts',
            'manage-faqs',
            'manage-press',
            'manage-sponsors',
            'manage-team',
            'review-abstracts',

            // Commerce & Finance
            'view-registrations',
            'edit-registrations',
            'override-registration-status',
            'manage-payments',
            'process-refunds',
            'manage-coupons',
            'manage-tiers',
            'export-finance',
            'view-analytics',

            // Desk & Operations
            'manage-exhibitor-leads',
            'manage-enquiries',
            'manage-accommodations',

            // On-site Check-in
            'use-checkin-scanner',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // 1. Super Admin: full access
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);
        $superAdmin->syncPermissions(Permission::all());

        // 2. Content Editor: pages, hero, speakers, sessions, conclaves, gallery, blog, FAQs, press, sponsors, team, abstracts
        $contentEditor = Role::firstOrCreate(['name' => 'Content Editor', 'guard_name' => 'web']);
        $contentEditor->syncPermissions([
            'manage-pages',
            'manage-hero',
            'manage-speakers',
            'manage-sessions',
            'manage-conclaves',
            'manage-gallery',
            'manage-posts',
            'manage-faqs',
            'manage-press',
            'manage-sponsors',
            'manage-team',
            'review-abstracts',
        ]);

        // 3. Finance: registrations, overrides, payments, refunds, coupons, tiers, exports, analytics
        $finance = Role::firstOrCreate(['name' => 'Finance', 'guard_name' => 'web']);
        $finance->syncPermissions([
            'view-registrations',
            'edit-registrations',
            'override-registration-status',
            'manage-payments',
            'process-refunds',
            'manage-coupons',
            'manage-tiers',
            'export-finance',
            'view-analytics',
        ]);

        // 4. Registration Desk: registrations (view & edit details), leads, enquiries, accommodations, check-in
        $regDesk = Role::firstOrCreate(['name' => 'Registration Desk', 'guard_name' => 'web']);
        $regDesk->syncPermissions([
            'view-registrations',
            'edit-registrations',
            'manage-exhibitor-leads',
            'manage-enquiries',
            'manage-accommodations',
            'use-checkin-scanner',
            'view-analytics',
        ]);

        // 5. Check-in Staff: scanner only, blocked from /admin
        $checkInStaff = Role::firstOrCreate(['name' => 'Check-in Staff', 'guard_name' => 'web']);
        $checkInStaff->syncPermissions([
            'use-checkin-scanner',
        ]);
    }
}
