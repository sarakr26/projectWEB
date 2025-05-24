<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class SetupStorage extends Command
{
    protected $signature = 'storage:setup';
    protected $description = 'Set up storage for the application';

    public function handle()
    {
        $this->info('Creating storage link...');
        Artisan::call('storage:link');
        $this->info('Storage link created successfully.');

        $this->info('Creating storage directories...');
        $directories = [
            'public/listings',
        ];

        foreach ($directories as $directory) {
            if (!file_exists(storage_path('app/' . $directory))) {
                mkdir(storage_path('app/' . $directory), 0755, true);
                $this->info("Created directory: {$directory}");
            }
        }

        $this->info('Storage setup completed successfully.');
    }
} 