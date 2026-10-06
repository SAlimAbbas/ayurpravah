<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ticket_tiers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category')->default('delegate'); // delegate, student, international, exhibitor
            $table->bigInteger('price')->default(0); // in minor units (paise)
            $table->string('currency')->default('INR');
            $table->decimal('gst_percent', 5, 2)->default(18.00);
            $table->timestamp('valid_from')->nullable();
            $table->timestamp('valid_until')->nullable();
            $table->integer('quota')->default(500);
            $table->integer('sold_count')->default(0);
            $table->boolean('is_active')->default(false);
            $table->integer('sort_order')->default(0);
            $table->json('inclusions')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('discount_type')->default('percent'); // percent, flat
            $table->decimal('value', 10, 2);
            $table->decimal('max_discount', 10, 2)->nullable();
            $table->integer('usage_limit')->default(100);
            $table->integer('per_user_limit')->default(1);
            $table->integer('used_count')->default(0);
            $table->timestamp('valid_from')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->json('applicable_tier_ids')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('reference')->unique(); // e.g. AP27-000123
            $table->string('type')->default('delegate');
            $table->foreignId('tier_id')->constrained('ticket_tiers');
            $table->string('status')->default('draft'); // draft, pending, paid, failed, refunded, cancelled
            
            // Personal & Professional
            $table->string('title')->default('Dr.');
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('gender')->nullable();
            $table->string('organisation_college')->nullable();
            $table->string('designation')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->default('India');
            $table->string('registration_council_no')->nullable();
            $table->string('gstin')->nullable();
            $table->text('dietary_special_needs')->nullable();

            // Pricing & Coupon
            $table->foreignId('coupon_id')->nullable()->constrained('coupons')->nullOnDelete();
            $table->bigInteger('subtotal')->default(0); // minor units
            $table->bigInteger('discount')->default(0);
            $table->bigInteger('tax')->default(0);
            $table->bigInteger('total')->default(0);
            $table->string('currency')->default('INR');

            // Offline Override & Audit
            $table->boolean('manual_override')->default(false);
            $table->string('override_by')->nullable();
            $table->text('override_reason')->nullable();

            // Refund
            $table->boolean('refund_flag')->default(false);
            $table->text('refund_notes')->nullable();
            $table->timestamp('refunded_at')->nullable();

            // Hold & Tracking
            $table->timestamp('hold_expires_at')->nullable();
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->boolean('consent_terms')->default(true);

            $table->timestamps();
            $table->softDeletes();

            $table->index(['email', 'status', 'tier_id']);
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained('registrations')->cascadeOnDelete();
            $table->string('gateway')->default('razorpay');
            $table->string('gateway_order_id')->index();
            $table->string('gateway_payment_id')->nullable()->index();
            $table->bigInteger('amount'); // minor units
            $table->string('currency')->default('INR');
            $table->string('status')->default('created'); // created, authorized, captured, failed, refunded
            $table->string('method')->nullable();
            $table->json('raw_payload')->nullable();
            $table->boolean('signature_verified')->default(false);
            $table->timestamp('captured_at')->nullable();
            $table->timestamps();
        });

        Schema::create('webhook_events', function (Blueprint $table) {
            $table->id();
            $table->string('gateway')->default('razorpay');
            $table->string('event_id')->unique();
            $table->string('type');
            $table->json('payload');
            $table->string('status')->default('received');
            $table->text('error')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->unique()->constrained('registrations')->cascadeOnDelete();
            $table->string('ticket_code')->unique(); // ULID-based unguessable code
            $table->text('qr_payload'); // signed token
            $table->string('status')->default('active'); // active, checked_in, void
            $table->timestamp('issued_at');
            $table->string('pdf_path')->nullable();
            $table->timestamps();
        });

        Schema::create('check_ins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->constrained('tickets')->cascadeOnDelete();
            $table->foreignId('scanned_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('scanned_at');
            $table->string('device')->nullable();
            $table->string('result')->default('ok'); // ok, duplicate, invalid, void, unpaid
            $table->string('gate_hall')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('check_ins');
        Schema::dropIfExists('tickets');
        Schema::dropIfExists('webhook_events');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('registrations');
        Schema::dropIfExists('coupons');
        Schema::dropIfExists('ticket_tiers');
    }
};
