---
Skill Name: API Designer
Skill Description: Ensures consistent API design across all routes by providing templates, patterns, and validation for new API endpoints
Trigger: Invoked when creating new API routes, modifying existing ones, or reviewing API architecture
---

# API Designer Skill

## Purpose
Maintains consistency in API design by ensuring new routes follow established patterns, providing templates for common route types, and validating endpoint design before implementation.

## When to Invoke
- **Creating new API routes** - Use templates and patterns to scaffold correctly
- **Modifying existing routes** - Ensure changes maintain consistency
- **Reviewing API design** - Validate endpoint design before implementation
- **Adding new feature domains** - Set up route structure for new feature areas
- **Debugging API issues** - Check for pattern violations that cause problems

---

## Execution Process

### Phase 1: Understand the Requirement

Before creating any route, gather this information:

| Question | Why It Matters |
|----------|----------------|
| What action does this perform? | Determines HTTP method and naming |
| Does it read or write data? | GET for reads, POST for writes |
| Does it require authentication? | Secured vs public route selection |
| What parameters does it need? | Request shape and validation |
| What does it return? | Response shape and error cases |
| Which feature domain does it belong to? | Directory placement |

### Phase 2: Select Route Type

Choose the appropriate route type based on requirements:

| Route Type | Use When | Method | Auth |
|------------|----------|--------|------|
| Public GET | Reading data without login | `get()` | None |
| Public POST | Actions without login (login, signup) | `post()` | None |
| Secured GET | Reading user-specific data | `securedGet()` | Required |
| Secured POST | User actions that modify data | `securedPost()` | Required |

### Phase 3: Apply Naming Conventions

**URL Path Conventions:**
```
/{feature}/{action}           - Feature action (e.g., /auth/login)
/{feature}/{resource}         - Resource access (e.g., /account/profile)
/{feature}/{resource}-{verb}  - Resource action (e.g., /account/stripe-create-setup-intent)
```

**Naming Rules:**
- Use `kebab-case` for all URL paths
- Use `kebab-case` for file names
- Feature name should match folder name
- Action should be verb or verb-noun

**Examples from Codebase:**
| URL Path | Feature | Action |
|----------|---------|--------|
| `/auth/login` | auth | login |
| `/auth/me` | auth | me (get current user) |
| `/account/signup` | account | signup |
| `/account/cancel` | account | cancel |
| `/account/reactivate` | account | reactivate |
| `/account/convert-to-paid` | account | convert-to-paid |
| `/account/create-stripe-portal-session-url` | account | create-stripe-portal-session-url |

### Phase 4: Generate Route Files

Use the appropriate template based on route type.

### Phase 5: Register the Route

Add route to the feature's `_*-routes.js` file.

### Phase 6: Verify and Document

- Test the route with actual requests
- Update CODEBASE-MAP.md if new routes added
- Document any new patterns in PATTERNS.md
- **For significant new features**: Create feature documentation in `.agent/knowledge/{FEATURE_NAME}.md`
  - Include API endpoints, usage examples, and troubleshooting
  - Document admin routes, special permissions, or security considerations
  - Provide setup instructions if configuration is required

---

## Route Templates

### Template: Public GET Handler
Use for reading data that doesn't require authentication.

**File:** `@server/routes/{feature}/{action}.js`
```javascript
/**
 * {Brief description of what this route does}
 * 
 * @route GET /{feature}/{action}
 * @param {Object} params - Query parameters
 * @param {string} [params.paramName] - Description of parameter
 * @returns {Object} Response object
 */
export default async ({ paramName = 'defaultValue' }) => {
    // Validate required parameters
    if (!paramName) {
        const err = new Error('paramName is required');
        err.status = 400;
        throw err;
    }

    // Perform operation
    const result = { /* ... */ };

    return {
        success: true,
        data: result
    };
};
```

### Template: Public POST Handler
Use for actions that don't require authentication (login, signup, public forms).

**File:** `@server/routes/{feature}/{action}.js`
```javascript
import { db } from '@server/lib/mongo-client.js';

/**
 * {Brief description of what this route does}
 * 
 * @route POST /{feature}/{action}
 * @param {Object} params - Request body
 * @param {string} params.requiredField - Description
 * @param {string} [params.optionalField] - Description
 * @param {Object} context - Route context
 * @param {Object} context.req - Express request
 * @returns {Object} Response object
 */
export default async ({ requiredField, optionalField = null }, { req }) => {
    // Validate required parameters
    if (!requiredField) {
        const err = new Error('requiredField is required');
        err.status = 400;
        throw err;
    }

    // Perform operation
    const result = await db.collections.collectionName.insertOne({
        requiredField,
        optionalField,
        createdAt: new Date()
    });

    return {
        success: true,
        message: 'Action completed successfully',
        id: result.insertedId.toString()
    };
};
```

### Template: Secured GET Handler
Use for reading data that requires authentication.

**File:** `@server/routes/{feature}/{action}.js`
```javascript
import { db } from '@server/lib/mongo-client.js';

/**
 * {Brief description of what this route does}
 * 
 * @route GET /{feature}/{action} (secured)
 * @param {Object} params - Query parameters
 * @param {Object} context - Route context
 * @param {Object} context.user - Authenticated user document
 * @returns {Object} Response object
 */
export default async ({ paramName }, { user }) => {
    // User is guaranteed to exist and be active (handled by registerSecuredRouteHandler)
    
    // Perform operation using user context
    const result = await db.collections.collectionName.findOne({
        userId: user._id
    });

    if (!result) {
        const err = new Error('Resource not found');
        err.status = 404;
        throw err;
    }

    return {
        success: true,
        data: result
    };
};
```

### Template: Secured POST Handler
Use for actions that modify data and require authentication.

**File:** `@server/routes/{feature}/{action}.js`
```javascript
import { db } from '@server/lib/mongo-client.js';

/**
 * {Brief description of what this route does}
 * 
 * @route POST /{feature}/{action} (secured)
 * @param {Object} params - Request body
 * @param {string} params.fieldName - Description
 * @param {Object} context - Route context
 * @param {Object} context.user - Authenticated user document
 * @returns {Object} Response object
 */
export default async ({ fieldName }, { user }) => {
    // Validate required parameters
    if (!fieldName) {
        const err = new Error('fieldName is required');
        err.status = 400;
        throw err;
    }

    // Perform operation
    const result = await db.collections.collectionName.updateOne(
        { userId: user._id },
        { 
            $set: { 
                fieldName,
                updatedAt: new Date() 
            } 
        }
    );

    if (result.matchedCount === 0) {
        const err = new Error('Resource not found');
        err.status = 404;
        throw err;
    }

    return {
        success: true,
        message: 'Update successful'
    };
};
```

### Template: Route Definition File
Use when creating a new feature domain.

**File:** `@server/routes/{feature}/_{feature}-routes.js`
```javascript
import actionOne from './action-one.js';
import actionTwo from './action-two.js';
import securedAction from './secured-action.js';

export default ({ get, post, securedGet, securedPost }) => {
    // Public routes
    get('/{feature}/action-one', actionOne);
    post('/{feature}/action-two', actionTwo);
    
    // Authenticated routes
    securedGet('/{feature}/secured-action', securedAction);
    securedPost('/{feature}/another-action', anotherAction);
};
```

---

## Error Handling Patterns

### Standard Error Response
All errors are automatically formatted by `registerRouteHandler`:
```javascript
{
    "error": "Error message",
    "redirect": "/optional-redirect-path" // or null
}
```

### Error with Status Code
```javascript
const err = new Error('Descriptive error message');
err.status = 400; // 400, 401, 403, 404, 500
throw err;
```

### Error with Redirect
```javascript
import { clientBase, reactivateRedirect } from '@server/lib/client-path-helpers.js';

const err = new Error('Account is inactive');
err.status = 403;
err.redirect = reactivateRedirect(email);
throw err;
```

### Common Status Codes
| Code | Meaning | When to Use |
|------|---------|-------------|
| 400 | Bad Request | Invalid parameters, validation failure |
| 401 | Unauthorized | Not logged in (handled automatically for secured routes) |
| 403 | Forbidden | Logged in but not allowed (inactive account, insufficient permissions) |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected errors (default) |

---

## Response Patterns

### Success Response with Data
```javascript
return {
    success: true,
    data: resultObject
};
```

### Success Response with Message
```javascript
return {
    success: true,
    message: 'Action completed successfully'
};
```

### Success Response with Redirect
```javascript
return {
    success: true,
    message: 'Login successful',
    redirect: '/dashboard'
};
```

### Returning User Profile Data
```javascript
return {
    email: user.email,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    // ... other safe-to-expose fields
};
```

**NEVER return sensitive fields:**
- `password`
- `stripeCustomerId` (unless needed for specific Stripe operations)
- `_id` (unless specifically needed)

---

## Validation Patterns

### Required Field Validation
```javascript
if (!email || !password) {
    const err = new Error('Email and password are required');
    err.status = 400;
    throw err;
}
```

### Conditional Required Fields
```javascript
if (!isSocial && !password) {
    const err = new Error('Password is required for non-social signup');
    err.status = 400;
    throw err;
}
```

### Email Format Validation
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    const err = new Error('Invalid email format');
    err.status = 400;
    throw err;
}
```

---

## Database Patterns

### Finding a Document
```javascript
import { db } from '@server/lib/mongo-client.js';

const user = await db.collections.accounts.findOne({ email });
if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
}
```

### Inserting a Document
```javascript
const result = await db.collections.collectionName.insertOne({
    ...data,
    createdAt: new Date()
});
return { id: result.insertedId.toString() };
```

### Updating a Document
```javascript
const result = await db.collections.accounts.updateOne(
    { email: user.email },
    { $set: { fieldName: value, updatedAt: new Date() } }
);
```

### Upserting a Document
```javascript
await db.collections.collectionName.updateOne(
    { uniqueField: value },
    { 
        $set: { ...data, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() }
    },
    { upsert: true }
);
```

---

## Integration with Other Services

### Stripe Integration
```javascript
import stripeClient from '@server/lib/stripe-client.js';

// Create customer
const customer = await stripeClient.customers.create({
    email,
    payment_method: paymentMethodId,
    invoice_settings: { default_payment_method: paymentMethodId }
});

// Create subscription
const subscription = await stripeClient.subscriptions.create({
    customer: customerId,
    items: [{ price: process.env.STRIPE_PRICE_ID }]
});
```

### Session Management
```javascript
// Set session data (in login/signup)
req.session.userId = user._id.toString();
req.session.email = user.email;

// Destroy session (in logout)
req.session.destroy();
```

---

## Checklist: New Route

Before creating a new route, verify:

- [ ] Route type determined (public/secured, GET/POST)
- [ ] URL path follows `/{feature}/{action}` convention
- [ ] File name matches action in kebab-case
- [ ] File placed in correct feature folder
- [ ] Required parameters validated with 400 errors
- [ ] Appropriate error status codes used
- [ ] Response follows standard patterns
- [ ] No sensitive data exposed in response
- [ ] Route registered in `_{feature}-routes.js`
- [ ] Database operations use `db.collections.*`
- [ ] JSDoc comment added with route info

---

## Checklist: New Feature Domain

When adding a new feature area:

- [ ] Create folder: `@server/routes/{feature}/`
- [ ] Create route definition: `@server/routes/{feature}/_{feature}-routes.js`
- [ ] Export default function with `({ get, post, securedGet, securedPost })`
- [ ] Create individual route handlers in separate files
- [ ] Add any new collections to `@server/lib/mongo-client.js`
- [ ] Update CODEBASE-MAP.md with new routes

---

## Anti-Patterns to Avoid

### ❌ Inconsistent URL Naming
```javascript
// BAD - mixed case, inconsistent separators
get('/auth/getUser', handler);
get('/auth/user_profile', handler);

// GOOD - kebab-case throughout
get('/auth/get-user', handler);
get('/auth/user-profile', handler);
```

### ❌ Using GET for State Changes
```javascript
// BAD - GET should not modify data
get('/account/delete', deleteHandler);

// GOOD - POST for state changes
post('/account/delete', deleteHandler);
```

### ❌ Exposing Sensitive Data
```javascript
// BAD - returning password hash
return { ...user };

// GOOD - explicitly select safe fields
return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
};
```

### ❌ Generic Error Messages
```javascript
// BAD - unhelpful error
throw new Error('Error');

// GOOD - specific, actionable error
const err = new Error('Email is required');
err.status = 400;
throw err;
```

### ❌ Missing Error Status Codes
```javascript
// BAD - defaults to 500, making it look like server error
throw new Error('User not found');

// GOOD - appropriate status code
const err = new Error('User not found');
err.status = 404;
throw err;
```

### ❌ Hardcoded Redirects
```javascript
// BAD - hardcoded URL
err.redirect = 'http://localhost:3001/login';

// GOOD - using client path helpers
import { clientBase } from '@server/lib/client-path-helpers.js';
err.redirect = `${clientBase}/login`;
```

---

## Commands

| Command | Action |
|---------|--------|
| `/api` | Start API Designer workflow for new route |
| `/api {feature}/{action}` | Scaffold specific route with given path |
| `/api-review` | Review existing routes for pattern violations |

---

## Integration Points

| After API Designer | Next Step |
|--------------------|-----------|
| New route created | Test with curl/Postman |
| New feature domain | Update CODEBASE-MAP.md |
| Pattern violation found | Fix and document in GOTCHAS.md |
| New pattern emerges | Document in PATTERNS.md |

---

## Example: Complete Route Creation

**Requirement:** Create an endpoint to update user profile name

**Step 1: Analyze**
- Action: Update user's first/last name
- Writes data: Yes → POST
- Requires auth: Yes → securedPost
- Feature: account
- Action name: update-profile

**Step 2: Create Handler**

`@server/routes/account/update-profile.js`:
```javascript
import { db } from '@server/lib/mongo-client.js';

/**
 * Updates the authenticated user's profile information
 * 
 * @route POST /account/update-profile (secured)
 * @param {Object} params - Request body
 * @param {string} [params.firstName] - User's first name
 * @param {string} [params.lastName] - User's last name
 * @param {Object} context - Route context
 * @param {Object} context.user - Authenticated user document
 * @returns {Object} Updated profile data
 */
export default async ({ firstName, lastName }, { user }) => {
    // Build update object with only provided fields
    const updates = { updatedAt: new Date() };
    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;

    await db.collections.accounts.updateOne(
        { _id: user._id },
        { $set: updates }
    );

    return {
        success: true,
        message: 'Profile updated successfully',
        firstName: firstName ?? user.firstName ?? '',
        lastName: lastName ?? user.lastName ?? ''
    };
};
```

**Step 3: Register Route**

In `@server/routes/account/_account-routes.js`:
```javascript
import updateProfile from './update-profile.js';

export default ({ get, post, securedGet, securedPost }) => {
    // ... existing routes ...
    securedPost('/account/update-profile', updateProfile);
};
```

**Step 4: Verify**
```bash
curl -X POST http://localhost:3000/account/update-profile \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=<session-cookie>" \
  -d '{"firstName": "John", "lastName": "Doe"}'
```

**Step 5: Update Documentation**
- Add route to CODEBASE-MAP.md under account routes
