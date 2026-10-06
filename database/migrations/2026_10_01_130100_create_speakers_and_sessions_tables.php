<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conclaves', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('layout')->default('standard'); // featured, standard, image, horizontal, offset
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->json('focus_areas')->nullable();
            $table->text('workshop_info')->nullable();
            $table->string('image')->nullable();
            $table->string('icon')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('speakers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('photo')->nullable();
            $table->string('designation')->nullable();
            $table->string('institution')->nullable();
            $table->string('country')->nullable();
            $table->longText('bio')->nullable();
            $table->string('talk_topic')->nullable();
            $table->json('social_links')->nullable();
            $table->string('category')->default('Ayurveda Experts'); // Keynote / Ayurveda Experts / Healthcare Leaders / Researchers / Industry Leaders / International
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('event_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conclave_id')->nullable()->constrained('conclaves')->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('day_number')->default(1);
            $table->date('session_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('hall_room')->nullable();
            $table->string('track')->nullable();
            $table->string('type')->default('keynote'); // keynote, panel, workshop, presentation
            $table->integer('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('event_session_speaker', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_session_id')->constrained('event_sessions')->cascadeOnDelete();
            $table->foreignId('speaker_id')->constrained('speakers')->cascadeOnDelete();
            $table->string('role')->default('speaker'); // speaker, chair, moderator
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_session_speaker');
        Schema::dropIfExists('event_sessions');
        Schema::dropIfExists('speakers');
        Schema::dropIfExists('conclaves');
    }
};
