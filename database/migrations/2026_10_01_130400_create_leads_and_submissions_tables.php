<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exhibitor_leads', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('company');
            $table->string('contact_person');
            $table->string('email');
            $table->string('phone');
            $table->string('website')->nullable();
            $table->string('category_industry')->nullable();
            $table->string('stall_interest')->nullable();
            $table->string('stall_size')->nullable();
            $table->text('products_brief')->nullable();
            $table->string('budget_note')->nullable();
            $table->text('message')->nullable();
            $table->string('status')->default('new'); // new, contacted, qualified, confirmed, lost
            $table->string('assigned_to')->nullable();
            $table->text('notes')->nullable();
            $table->string('source')->nullable();
            $table->timestamps();
        });

        Schema::create('abstract_submissions', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('author_name');
            $table->string('author_email');
            $table->string('author_phone');
            $table->string('affiliation');
            $table->json('co_authors')->nullable();
            $table->string('title');
            $table->string('track_category');
            $table->foreignId('conclave_id')->nullable()->constrained('conclaves')->nullOnDelete();
            $table->longText('abstract_text');
            $table->string('keywords')->nullable();
            $table->string('file_path')->nullable();
            $table->string('presentation_type')->default('oral'); // oral, poster
            $table->string('status')->default('submitted'); // submitted, under_review, accepted, rejected, revision
            $table->foreignId('reviewer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('review_notes')->nullable();
            $table->decimal('score', 4, 2)->nullable();
            $table->timestamp('decision_at')->nullable();
            $table->timestamps();
        });

        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('contact'); // partner, sponsorship, contact
            $table->string('department')->nullable(); // delegate, exhibitor, knowledge, media, sponsorship
            $table->string('name');
            $table->string('organisation')->nullable();
            $table->string('email');
            $table->string('phone');
            $table->text('message');
            $table->string('status')->default('new'); // new, read, in_progress, resolved, archived
            $table->string('assigned_to')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('accommodations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('images')->nullable();
            $table->string('price_note')->nullable();
            $table->string('distance')->nullable();
            $table->string('booking_url')->nullable();
            $table->string('contact_info')->nullable();
            $table->integer('rooms_total')->default(0);
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('accommodation_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->nullable()->constrained('registrations')->nullOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->date('check_in_date');
            $table->date('check_out_date');
            $table->string('room_type');
            $table->integer('rooms_count')->default(1);
            $table->string('status')->default('pending'); // pending, confirmed, cancelled
            $table->string('allocated_room_ref')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accommodation_bookings');
        Schema::dropIfExists('accommodations');
        Schema::dropIfExists('enquiries');
        Schema::dropIfExists('abstract_submissions');
        Schema::dropIfExists('exhibitor_leads');
    }
};
