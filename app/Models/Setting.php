<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value', 'group'];

    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        if (!$setting) {
            return $default;
        }

        $val = json_decode($setting->value, true);
        return json_last_error() === JSON_ERROR_NONE ? $val : $setting->value;
    }

    public static function set(string $key, mixed $value, string $group = 'general'): void
    {
        $storedValue = is_array($value) || is_object($value) ? json_encode($value) : (string) $value;
        static::updateOrCreate(['key' => $key], ['value' => $storedValue, 'group' => $group]);
    }
}
