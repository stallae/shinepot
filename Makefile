# Shinepot React Native Makefile
# Use: make <command>

.PHONY: help clean clean-all install update pods ios android start reset

# Default - show help
help:
	@echo "Available commands:"
	@echo "  make install     - Install dependencies (yarn + pods)"
	@echo "  make update      - Quick update (yarn + pods)"
	@echo "  make reset       - Full reset (clean everything + reinstall)"
	@echo "  make clean       - Clean build caches"
	@echo "  make clean-all   - Deep clean everything"
	@echo "  make pods        - Install iOS pods only"
	@echo "  make ios         - Build and run iOS"
	@echo "  make android     - Build and run Android"
	@echo "  make start       - Start Metro bundler"
	@echo "  make start-clean - Start Metro with cache reset"

# Install dependencies
install:
	@echo "📦 Installing node modules..."
	yarn install
	@echo "🍎 Installing iOS pods..."
	cd ios && pod install
	cd .. 
	@echo "✅ Done!"

# Quick update (use after git pull or package changes)
update:
	@echo "📦 Updating node modules..."
	yarn install
	@echo "🍎 Updating iOS pods..."
	cd ios && pod install
	@echo "✅ Update complete!"

# Clean build caches
clean:
	@echo "🧹 Cleaning build caches..."
	rm -rf ios/build
	rm -rf android/build
	rm -rf android/app/build
	rm -rf ~/Library/Developer/Xcode/DerivedData
	@echo "✅ Build caches cleaned!"

# Deep clean everything
clean-all:
	@echo "🧹 Deep cleaning everything..."
	rm -rf node_modules
	rm -rf vendor/bundle
	rm -rf ios/Pods
	rm -rf ios/Podfile.lock
	rm -rf ios/build
	rm -rf ios/.xcode.env.local
	rm -rf android/build
	rm -rf android/app/build
	rm -rf android/.gradle
	rm -rf ~/Library/Developer/Xcode/DerivedData
	rm -rf $${TMPDIR:-/tmp}/metro-*
	rm -rf $${TMPDIR:-/tmp}/react-*
	rm -rf $${TMPDIR:-/tmp}/haste-map-*
	@echo "✅ Deep clean complete!"

# Full reset (clean + install)
reset: clean-all install
	@echo "🎉 Full reset complete!"

# Install iOS pods only
pods:
	@echo "🍎 Installing iOS pods..."
	cd ios && pod install
	@echo "✅ Pods installed!"

# Start Metro bundler
start:
	@echo "🚇 Starting Metro bundler..."
	yarn start

# Start Metro with cache reset
start-clean:
	@echo "🚇 Starting Metro bundler (with cache reset)..."
	yarn start --reset-cache

# Kill Metro if running on port 8081
kill-metro:
	@echo "☠️ Killing Metro on port 8081..."
	lsof -ti:8081 | xargs kill -9 2>/dev/null || echo "No process on port 8081"
	@echo "✅ Done!"
